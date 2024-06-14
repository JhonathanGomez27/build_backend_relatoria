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
exports.PubSubService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_1 = require("events");
const sesione_entity_1 = require("../../sesiones/entities/sesione.entity");
const transcripcione_entity_1 = require("../../transcripciones/entities/transcripcione.entity");
const typeorm_2 = require("typeorm");
const csv_converter_1 = require("../../../utils/csv.converter");
const crypto = require("crypto");
let PubSubService = class PubSubService extends events_1.EventEmitter {
    constructor(sesionRepository, transcripcionRepository) {
        super({ captureRejections: true });
        this.sesionRepository = sesionRepository;
        this.transcripcionRepository = transcripcionRepository;
    }
    publish(topic, data) {
        this.emit(topic, data);
    }
    subscribe(topic, handler) {
        this.on(topic, handler);
    }
    unsubscribe(topic, handler) {
        this.removeListener(topic, handler);
    }
    async cronArchivos() {
        const fs = require('fs');
        const path = require('path');
        const csvPath = path.resolve(__dirname, '../../../../csv');
        console.log('csvPath', csvPath);
        const files = fs.readdirSync(csvPath);
        const sesionFile = files.find((file) => file.includes('sesion.csv'));
        if (!sesionFile) {
            return { message: 'No se encontró el archivo de sesiones' };
        }
        const sesionFilePath = path.resolve(csvPath, sesionFile);
        const sesionBuffer = fs.readFileSync(sesionFilePath);
        if (!sesionBuffer) {
            return { message: 'No se encontró el archivo de sesiones' };
        }
        const csvString = sesionBuffer.toString('utf-8');
        const jsonData = await (0, csv_converter_1.CsvConverter)(csvString);
        const sesion = jsonData[0];
        const archivoName = sesion.nombre_archivos || sesion.nombre.replace(/ /g, '_');
        const nuevaSesion = new sesione_entity_1.Sesion();
        nuevaSesion.clavePrincipal = crypto.randomUUID();
        nuevaSesion.id_comision = sesion.id_comision;
        nuevaSesion.nombre = sesion.nombre;
        nuevaSesion.fecha = sesion.fecha;
        nuevaSesion.rutaAudio = `${archivoName}.wav`;
        nuevaSesion.rutaVideo = `${archivoName}.mp4`;
        nuevaSesion.rutaDoc = `${archivoName}.docx`;
        nuevaSesion.rutaPDF = `${archivoName}.pdf`;
        nuevaSesion.rutaXML = `${archivoName}.xml`;
        await this.sesionRepository.save(nuevaSesion);
        const transcripcionFile = files.find((file) => file.includes('transcripcion.csv'));
        if (!transcripcionFile) {
            return { message: 'No se encontró el archivo de transcripciones' };
        }
        const transcripcionFilePath = path.resolve(csvPath, transcripcionFile);
        const transcripcionBuffer = fs.readFileSync(transcripcionFilePath);
        if (!transcripcionBuffer) {
            return { message: 'No se encontró el archivo de transcripciones' };
        }
        const transcripcionCsvString = transcripcionBuffer.toString('utf-8');
        const transcripcionJsonData = await (0, csv_converter_1.CsvConverter)(transcripcionCsvString);
        const entidadesTranscripciones = await Promise.all(transcripcionJsonData.map(async (transcripcion) => {
            const nuevaTranscripcion = new transcripcione_entity_1.Transcripcion();
            nuevaTranscripcion.clavePrincipal = crypto.randomUUID();
            nuevaTranscripcion.id_sesion = nuevaSesion.clavePrincipal;
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
        const processedPath = path.resolve(__dirname, '../../../../procesados');
        if (!fs.existsSync(processedPath)) {
            fs.mkdirSync(processedPath);
        }
        const fecha = new Date();
        const fechaString = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}_${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
        const sesionProcesadaPath = path.resolve(processedPath, `${fechaString}_${sesionFile}`);
        fs.renameSync(sesionFilePath, sesionProcesadaPath);
        const transcripcionProcesadaPath = path.resolve(processedPath, `${fechaString}_${transcripcionFile}`);
        fs.renameSync(transcripcionFilePath, transcripcionProcesadaPath);
        const filesToMove = fs.readdirSync(csvPath);
        filesToMove.forEach((file) => {
            const filePath = path.resolve(csvPath, file);
            const processedFilePath = path.resolve(processedPath, file);
            fs.renameSync(filePath, processedFilePath);
        });
        return { message: 'Archivos procesados correctamente' };
    }
    async escaparCaracteres(texto) {
        const caracteresProblematicos = /[\\'":!()*/?]/g;
        return texto.replace(caracteresProblematicos, '\\$&');
    }
};
exports.PubSubService = PubSubService;
exports.PubSubService = PubSubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesione_entity_1.Sesion)),
    __param(1, (0, typeorm_1.InjectRepository)(transcripcione_entity_1.Transcripcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PubSubService);
//# sourceMappingURL=pub-sub.service.js.map