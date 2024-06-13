/// <reference types="node" />
import { Sesion } from './entities/sesione.entity';
import { Repository } from 'typeorm';
import { Transcripcion } from '../transcripciones/entities/transcripcione.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Comision } from '../comisiones/entities/comision.entity';
import { Log } from '../logs/entities/log.entity';
export declare class SesionesService {
    private sesionRepository;
    private transcripcionRepository;
    private usuarioRepository;
    private comisionesRepository;
    private logRepository;
    constructor(sesionRepository: Repository<Sesion>, transcripcionRepository: Repository<Transcripcion>, usuarioRepository: Repository<Usuario>, comisionesRepository: Repository<Comision>, logRepository: Repository<Log>);
    uploadFile(fileBuffer: Buffer): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<{
        ok: boolean;
        message: string;
        sesion?: undefined;
    } | {
        ok: boolean;
        sesion: {
            transcripciones: Transcripcion[];
            totalTranscripciones: number;
            clavePrincipal: string;
            nombre: string;
            fecha: Date;
            horaInicio: string;
            horaFin: string;
            comision: Comision;
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
    buscarEnUnaSesion(id: string, palabraClave: string, pagina: number, limite: number, fechaInicio: Date, fechaFin: Date): Promise<{
        resultados: Transcripcion[];
        total: number;
    }>;
    obtenerSesionesPorComision(user: any, idComision: string, pagina: number, limite: number): Promise<{
        data: any[];
        total: number;
        sesiones?: undefined;
        comision?: undefined;
    } | {
        sesiones: Sesion[];
        total: number;
        comision: Comision;
        data?: undefined;
    }>;
    obtenerTranscripciones(user: any, idSesion: string, pagina: number, limite: number): Promise<{
        data: any[];
        total: number;
        transcripciones?: undefined;
    } | {
        transcripciones: Transcripcion[];
        total: number;
        data?: undefined;
    }>;
}
