"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sesione_entity_1 = require("./entities/sesione.entity");
const typeorm_2 = require("typeorm");
const csv_converter_1 = require("../../utils/csv.converter");
const error_message_1 = require("../../utils/error.message");
const transcripcione_entity_1 = require("../transcripciones/entities/transcripcione.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const log_entity_1 = require("../logs/entities/log.entity");
let SesionesService = class SesionesService {
    constructor(sesionRepository, transcripcionRepository, usuarioRepository, comisionesRepository, logRepository) {
        this.sesionRepository = sesionRepository;
        this.transcripcionRepository = transcripcionRepository;
        this.usuarioRepository = usuarioRepository;
        this.comisionesRepository = comisionesRepository;
        this.logRepository = logRepository;
    }
    async uploadFile(fileBuffer) {
        try {
            const csvString = fileBuffer.toString('utf-8');
            const jsonData = await (0, csv_converter_1.CsvConverter)(csvString);
            const sesiones = jsonData.map((sesion) => {
                const nuevaSesion = new sesione_entity_1.Sesion();
                nuevaSesion.clavePrincipal = sesion.id;
                nuevaSesion.id_comision = sesion.id_comision;
                nuevaSesion.nombre = sesion.nombre;
                nuevaSesion.fecha = sesion.fecha;
                nuevaSesion.rutaAudio = sesion.audio;
                nuevaSesion.rutaVideo = sesion.video;
                nuevaSesion.duracion = sesion.duracion;
                return nuevaSesion;
            });
            for (let index = 0; index < sesiones.length; index++) {
                const element = sesiones[index];
                if (!element.clavePrincipal || element.clavePrincipal == '') {
                    continue;
                }
                await this.sesionRepository.save(element);
            }
            return { message: 'Archivo procesado correctamente' };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async findOne(id) {
        try {
            const sesion = await this.sesionRepository.findOne({
                where: { clavePrincipal: id }
            });
            if (!sesion) {
                return {
                    ok: false,
                    message: 'Sesión no encontrada'
                };
            }
            const [transcripciones, totalTranscripciones] = await this.transcripcionRepository.findAndCount({
                where: { id_sesion: sesion.clavePrincipal },
                order: { minuto: 'ASC' }
            });
            console.log('transcripciones', transcripciones);
            const sesionResponse = {
                ...sesion,
                transcripciones,
                totalTranscripciones
            };
            return {
                ok: true,
                sesion: sesionResponse
            };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async buscarEnUnaSesion(id, palabraClave, pagina, limite, fechaInicio, fechaFin) {
        const sesion = await this.sesionRepository.findOne({
            where: { clavePrincipal: id }
        });
        if (!sesion) {
            return { resultados: [], total: 0 };
        }
        if (palabraClave !== '') {
            const palabras = palabraClave.split(" ");
            const fraseFormateada = palabras.map(palabra => `'${palabra}'`).join(" & ");
            palabraClave = fraseFormateada;
        }
        else {
            const [transcripciones, total] = await this.transcripcionRepository.findAndCount({
                where: { sesion: sesion },
                order: {
                    minuto: "ASC"
                },
                skip: (pagina - 1) * limite,
                take: limite
            });
            return { resultados: transcripciones, total };
        }
        const [transcripciones, total] = await this.transcripcionRepository.createQueryBuilder('transcripcion')
            .where("transcripcion.id_sesion = :id", { id: sesion.clavePrincipal })
            .andWhere('to_tsvector(transcripcion.texto::text) @@ to_tsquery(:palabraClave)', { palabraClave })
            .orderBy('transcripcion.minuto', 'ASC')
            .skip((pagina - 1) * limite)
            .take(limite)
            .getManyAndCount();
        return { resultados: transcripciones, total };
    }
    async obtenerSesionesPorComision(user, idComision, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta sesion',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        if (user.rol !== 'admin') {
            const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
            if (!usuario) {
                return { data: [], total: 0 };
            }
            const comision_id = usuario.comision_id;
            const comision = await this.comisionesRepository.findOne({ where: { id: comision_id } });
            const [sesiones, totalSesiones] = await this.sesionRepository.findAndCount({
                where: { id_comision: comision_id },
                skip: (pagina - 1) * limite,
                take: limite
            });
            return { sesiones, total: totalSesiones, comision };
        }
        const comision = await this.comisionesRepository.findOne({ where: { id: idComision } });
        const [sesiones, totalSesiones] = await this.sesionRepository.findAndCount({
            where: { id_comision: idComision },
            skip: (pagina - 1) * limite,
            take: limite
        });
        return { sesiones, total: totalSesiones, comision };
    }
    async obtenerTranscripciones(user, idSesion, pagina, limite) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta sesion',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        const [transcripciones, totalTranscripciones] = await this.transcripcionRepository.findAndCount({
            where: { id_sesion: idSesion },
            order: { minuto: 'ASC' },
            skip: (pagina - 1) * limite,
            take: limite
        });
        return { transcripciones, total: totalTranscripciones };
    }
};
exports.SesionesService = SesionesService;
exports.SesionesService = SesionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesione_entity_1.Sesion)),
    __param(1, (0, typeorm_1.InjectRepository)(transcripcione_entity_1.Transcripcion)),
    __param(2, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(3, (0, typeorm_1.InjectRepository)(comision_entity_1.Comision)),
    __param(4, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SesionesService);
//# sourceMappingURL=sesiones.service.js.map