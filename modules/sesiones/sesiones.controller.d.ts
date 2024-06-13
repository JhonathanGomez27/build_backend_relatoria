/// <reference types="multer" />
import { SesionesService } from './sesiones.service';
import { PalabraClave } from 'src/common/palabraClave';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class SesionesController {
    private readonly sesionesService;
    constructor(sesionesService: SesionesService);
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
    } | {
        ok: boolean;
        sesion: {
            transcripciones: import("../transcripciones/entities/transcripcione.entity").Transcripcion[];
            totalTranscripciones: number;
            clavePrincipal: string;
            nombre: string;
            fecha: Date;
            horaInicio: string;
            horaFin: string;
            comision: import("../comisiones/entities/comision.entity").Comision;
            id_comision: string;
            sincronizado: boolean;
            rutaVideo: string;
            rutaAudio: string;
            rutaXML: string;
            rutaPDF: string;
            rutaDoc: string;
            duracion: string;
            createdAt: Date;
            updatedAt: Date;
        };
        message?: undefined;
    } | {
        message: string;
        ok?: undefined;
        sesion?: undefined;
    }>;
    buscarEnUnaSesion(id: string, body: PalabraClave, query: FiltersPaginatedQuery): Promise<{
        resultados: import("../transcripciones/entities/transcripcione.entity").Transcripcion[];
        total: number;
    }>;
    obtenerSesionesComision(req: any, id: string, query: FiltersPaginatedQuery): Promise<{
        data: any[];
        total: number;
        sesiones?: undefined;
        comision?: undefined;
    } | {
        sesiones: import("./entities/sesione.entity").Sesion[];
        total: number;
        comision: import("../comisiones/entities/comision.entity").Comision;
        data?: undefined;
    }>;
    obtenerTranscripciones(req: any, id: string, query: FiltersPaginatedQuery): Promise<{
        data: any[];
        total: number;
        transcripciones?: undefined;
    } | {
        transcripciones: import("../transcripciones/entities/transcripcione.entity").Transcripcion[];
        total: number;
        data?: undefined;
    }>;
}
