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
exports.TranscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const transcripcione_entity_1 = require("./entities/transcripcione.entity");
const typeorm_2 = require("@nestjs/typeorm");
const error_message_1 = require("../../utils/error.message");
const csv_converter_1 = require("../../utils/csv.converter");
let TranscripcionesService = class TranscripcionesService {
    constructor(transcripcionRepository) {
        this.transcripcionRepository = transcripcionRepository;
    }
    async procesarArchivo(fileBuffer) {
        try {
            const csvString = fileBuffer.toString('utf-8');
            const jsonData = await (0, csv_converter_1.CsvConverter)(csvString);
            const entidadesTranscripciones = await Promise.all(jsonData.map(async (transcripcion) => {
                const nuevaTranscripcion = new transcripcione_entity_1.Transcripcion();
                nuevaTranscripcion.clavePrincipal = transcripcion.id;
                nuevaTranscripcion.id_sesion = transcripcion.id_sesion;
                nuevaTranscripcion.texto = await this.escaparCaracteres(transcripcion.contenido);
                nuevaTranscripcion.textoOriginal = transcripcion.contenido;
                nuevaTranscripcion.minuto = transcripcion.minuto;
                return nuevaTranscripcion;
            }));
            for (let index = 0; index < entidadesTranscripciones.length; index++) {
                const element = entidadesTranscripciones[index];
                if (!element.clavePrincipal || element.clavePrincipal == '') {
                    continue;
                }
                await this.transcripcionRepository.save(element);
            }
            return { message: 'Archivo procesado correctamente' };
        }
        catch (error) {
            console.log(error);
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async escaparCaracteres(texto) {
        const caracteresProblematicos = /[\\'":!()*/?]/g;
        return texto.replace(caracteresProblematicos, '\\$&');
    }
};
exports.TranscripcionesService = TranscripcionesService;
exports.TranscripcionesService = TranscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(transcripcione_entity_1.Transcripcion)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TranscripcionesService);
//# sourceMappingURL=transcripciones.service.js.map