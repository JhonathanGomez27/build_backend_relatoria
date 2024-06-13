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
exports.ComisionesService = void 0;
const common_1 = require("@nestjs/common");
const comision_entity_1 = require("./entities/comision.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const csv_converter_1 = require("../../utils/csv.converter");
const error_message_1 = require("../../utils/error.message");
const tipos_comision_entity_1 = require("../tipos_comision/entities/tipos_comision.entity");
const sesione_entity_1 = require("../sesiones/entities/sesione.entity");
const transcripcione_entity_1 = require("../transcripciones/entities/transcripcione.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const log_entity_1 = require("../logs/entities/log.entity");
let ComisionesService = class ComisionesService {
    constructor(comisionesRepository, tipoComisionRepository, sesionRepository, transcripcionRepository, usuarioRepository, logRepository) {
        this.comisionesRepository = comisionesRepository;
        this.tipoComisionRepository = tipoComisionRepository;
        this.sesionRepository = sesionRepository;
        this.transcripcionRepository = transcripcionRepository;
        this.usuarioRepository = usuarioRepository;
        this.logRepository = logRepository;
    }
    async uploadFile(fileBuffer) {
        try {
            const csvString = fileBuffer.toString('utf-8');
            const jsonData = await (0, csv_converter_1.CsvConverter)(csvString);
            const comisiones = await Promise.all(jsonData.map(async (data) => {
                const tipoComisiones = await this.tipoComisionRepository.findByIds(JSON.parse(data.id_tipo_comision));
                const nuevaComision = new comision_entity_1.Comision();
                nuevaComision.id = data.id;
                nuevaComision.title = data.titulo;
                nuevaComision.description = data.titulo;
                nuevaComision.theme = data.tema;
                nuevaComision.presidente = data.presidente;
                nuevaComision.vicepresidente = data.vicepresidente;
                nuevaComision.secretario = data.secretario;
                nuevaComision.subsecretario = data.subsecretario;
                nuevaComision.tipo_comision = tipoComisiones;
                return nuevaComision;
            }));
            for (let index = 0; index < comisiones.length; index++) {
                const element = comisiones[index];
                if (!element.id || element.id == '') {
                    continue;
                }
                await this.comisionesRepository.save(element);
            }
            return { message: 'Archivo procesado correctamente' };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async getComisionesPorTipoComision(user, id) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta comision',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        if (user.rol !== 'admin') {
            const comisionId = usuario.comision_id;
            const comision = await this.comisionesRepository.find({ where: { id: comisionId } });
            const tipoComision = await this.tipoComisionRepository
                .createQueryBuilder('tipo_comision')
                .innerJoinAndSelect('tipo_comision.comisiones', 'comision', 'comision.id = :comisionId', { comisionId: comisionId })
                .getOne();
            delete tipoComision.comisiones;
            return { data: comision, tipoComision };
        }
        const tipoComision = await this.tipoComisionRepository.findOne({ where: { id: id } });
        const [comisiones, total] = await this.comisionesRepository
            .createQueryBuilder('comision')
            .innerJoinAndSelect('comision.tipo_comision', 'tipo_comision', 'tipo_comision.id = :id', { id: tipoComision.id })
            .getManyAndCount();
        return { data: comisiones, total, tipoComision };
    }
    async findAll(user) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta comision',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        if (user.rol !== 'admin') {
            const comisionId = usuario.comision_id;
            const comision = await this.comisionesRepository.find({ where: { id: comisionId } });
            return { data: comision, total: 1 };
        }
        const [comisiones, total] = await this.comisionesRepository.findAndCount();
        return { data: comisiones, total };
    }
    async getComisionesPaginadas(pagina, limite, orden) {
        const [comisiones, total] = await this.comisionesRepository.findAndCount({
            take: limite,
            skip: (pagina - 1) * limite,
            order: { title: orden },
        });
        return { data: comisiones, total };
    }
    async buscarEnUnaComisionEstandar(user, palabraClave, pagina, tamanoPagina, fechaInicial, fechaFinal, comisionId, filtroOrdenamiento) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { resultados: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta comision',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        let comision;
        if (user.rol !== 'admin') {
            comision = usuario.comision_id;
        }
        else {
            comision = comisionId;
        }
        return await this.buscarEnUnaComision(comision, palabraClave, pagina, tamanoPagina, fechaInicial, fechaFinal, filtroOrdenamiento);
    }
    async buscarEnUnaComision(comisionId, palabraClave, pagina, tamanoPagina, fechaInicial, fechaFinal, filtroOrdenamiento) {
        const skip = (Number(pagina) - 1) * Number(tamanoPagina);
        const limit = skip + Number(tamanoPagina);
        if (palabraClave !== '') {
            const palabras = palabraClave.split(" ");
            const fraseFormateada = palabras.map(palabra => `'${palabra}'`).join(" & ");
            palabraClave = fraseFormateada;
        }
        const comision = await this.comisionesRepository.findOne({ where: { id: comisionId } });
        if (!comision) {
            return { resultados: [], total: 0 };
        }
        const sesionQuery = this.sesionRepository.createQueryBuilder('sesion');
        sesionQuery.where('sesion.id_comision = :comisionId', { comisionId });
        if (fechaInicial && fechaFinal) {
            sesionQuery.andWhere('sesion.fecha BETWEEN :fechaInicial AND :fechaFinal', { fechaInicial, fechaFinal });
        }
        if (filtroOrdenamiento) {
            sesionQuery.orderBy(filtroOrdenamiento.campo, filtroOrdenamiento.direccion);
        }
        const sesiones = await sesionQuery.select('sesion.clavePrincipal').getMany();
        if (sesiones.length === 0) {
            return { resultados: [], total: 0 };
        }
        const transcripcionQuery = this.transcripcionRepository.createQueryBuilder('transcripcion');
        transcripcionQuery.where('transcripcion.id_sesion IN (:...sesiones)', { sesiones: sesiones.map(sesion => sesion.clavePrincipal) });
        transcripcionQuery.andWhere('to_tsvector(transcripcion.texto::text) @@ to_tsquery(:palabraClave)', { palabraClave });
        const transcripciones = await transcripcionQuery.getMany();
        const resultados = await Promise.all(transcripciones.map(async (transcripcion) => {
            const sesion = await this.sesionRepository.findOne({ where: { clavePrincipal: transcripcion.id_sesion } });
            return { sesion, transcripcion };
        }));
        const agrupado = resultados.reduce((acumulador, resultado) => {
            const { sesion } = resultado;
            if (!acumulador[sesion.clavePrincipal]) {
                acumulador[sesion.clavePrincipal] = {
                    sesion,
                    coincidencias: 1,
                    transcripciones: [resultado.transcripcion]
                };
            }
            else {
                acumulador[sesion.clavePrincipal].coincidencias++;
                acumulador[sesion.clavePrincipal].transcripciones.push(resultado.transcripcion);
            }
            return acumulador;
        }, {});
        const resultadoArray = Object.keys(agrupado).map(clavePrincipal => {
            return agrupado[clavePrincipal];
        });
        const resultadoOrdenado = resultadoArray.sort((a, b) => b.coincidencias - a.coincidencias);
        const total = resultadoOrdenado.length;
        const resultadosPaginados = resultadoOrdenado.slice(skip, limit);
        return { resultados: resultadosPaginados, total, comision };
    }
    async buscarEnTodasLasComisiones(palabraClave, pagina, tamanoPagina, fechaInicial, fechaFinal) {
        const skip = (Number(pagina) - 1) * Number(tamanoPagina);
        const limit = skip + Number(tamanoPagina);
        const [comisionesSearch, totalComisiones] = await this.comisionesRepository.findAndCount({
            where: { title: (0, typeorm_1.ILike)(`%${palabraClave}%`) }
        });
        if (palabraClave !== '') {
            const palabras = palabraClave.split(" ");
            const fraseFormateada = palabras.map(palabra => `'${palabra}'`).join(" & ");
            palabraClave = fraseFormateada;
        }
        const comisionQuery = this.comisionesRepository.createQueryBuilder('comision');
        const comisiones = await comisionQuery.select('comision.id').getMany();
        if (comisiones.length === 0) {
            return { resultados: [], total: 0 };
        }
        const sesionQuery = this.sesionRepository.createQueryBuilder('sesion');
        sesionQuery.where('sesion.id_comision IN (:...comisiones)', { comisiones: comisiones.map(comision => comision.id) });
        if (fechaInicial && fechaFinal) {
            sesionQuery.andWhere('sesion.fecha BETWEEN :fechaInicial AND :fechaFinal', { fechaInicial, fechaFinal });
        }
        const sesiones = await sesionQuery.select('sesion.clavePrincipal').getMany();
        if (sesiones.length === 0) {
            return { resultados: [], total: 0 };
        }
        const transcripcionQuery = this.transcripcionRepository.createQueryBuilder('transcripcion');
        transcripcionQuery.where('transcripcion.id_sesion IN (:...sesiones)', { sesiones: sesiones.map(sesion => sesion.clavePrincipal) });
        transcripcionQuery.andWhere('to_tsvector(transcripcion.texto::text) @@ to_tsquery(:palabraClave)', { palabraClave });
        const transcripciones = await transcripcionQuery.getMany();
        const resultados = await Promise.all(transcripciones.map(async (transcripcion) => {
            const sesion = await this.sesionRepository.findOne({ where: { clavePrincipal: transcripcion.id_sesion } });
            const comision = await this.comisionesRepository.findOne({ where: { id: sesion.id_comision } });
            return { comision, sesion, transcripcion };
        }));
        const agrupado = resultados.reduce((acumulador, resultado) => {
            const { comision, sesion } = resultado;
            if (!acumulador[comision.id]) {
                acumulador[comision.id] = {
                    comision,
                    coincidencias: 1,
                    sesiones: [sesion]
                };
            }
            else {
                acumulador[comision.id].coincidencias++;
            }
            return acumulador;
        }, {});
        const resultadoArray = Object.keys(agrupado).map(clavePrincipal => {
            return agrupado[clavePrincipal];
        });
        const resultadoOrdenado = resultadoArray.sort((a, b) => b.coincidencias - a.coincidencias);
        const total = resultadoOrdenado.length;
        const resultadosPaginados = resultadoOrdenado.slice(skip, limit);
        return { resultados: resultadosPaginados, total, comisiones: comisionesSearch, totalComisiones: totalComisiones };
    }
    async getSesionesPorComision(user, id, page, limit, filtroOrdenamiento) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!usuario) {
            return { resultados: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'consulta sesion',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        const skip = (Number(page) - 1) * Number(limit);
        const limitPage = Number(limit);
        const comision = await this.comisionesRepository.findOne({ where: { id } });
        const sesionesQuery = this.sesionRepository.createQueryBuilder('sesion');
        sesionesQuery.where('sesion.id_comision = :id', { id });
        if (filtroOrdenamiento) {
            sesionesQuery.orderBy(filtroOrdenamiento.campo, filtroOrdenamiento.direccion);
        }
        sesionesQuery.skip(skip);
        sesionesQuery.take(limitPage);
        const sesiones = await sesionesQuery.getMany();
        const total = await this.sesionRepository.count({ where: { id_comision: id } });
        const sesionesReturn = [];
        for (let index = 0; index < sesiones.length; index++) {
            const sesion = sesiones[index];
            sesionesReturn.push({ sesion });
        }
        return { resultados: sesionesReturn, total, comision: comision };
    }
};
exports.ComisionesService = ComisionesService;
exports.ComisionesService = ComisionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comision_entity_1.Comision)),
    __param(1, (0, typeorm_2.InjectRepository)(tipos_comision_entity_1.TipoComision)),
    __param(2, (0, typeorm_2.InjectRepository)(sesione_entity_1.Sesion)),
    __param(3, (0, typeorm_2.InjectRepository)(transcripcione_entity_1.Transcripcion)),
    __param(4, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(5, (0, typeorm_2.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ComisionesService);
//# sourceMappingURL=comisiones.service.js.map