/// <reference types="node" />
import { Comision } from './entities/comision.entity';
import { Repository } from 'typeorm';
import { TipoComision } from '../tipos_comision/entities/tipos_comision.entity';
import { Sesion } from '../sesiones/entities/sesione.entity';
import { Transcripcion } from '../transcripciones/entities/transcripcione.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Log } from '../logs/entities/log.entity';
export declare class ComisionesService {
    private comisionesRepository;
    private tipoComisionRepository;
    private sesionRepository;
    private transcripcionRepository;
    private usuarioRepository;
    private logRepository;
    constructor(comisionesRepository: Repository<Comision>, tipoComisionRepository: Repository<TipoComision>, sesionRepository: Repository<Sesion>, transcripcionRepository: Repository<Transcripcion>, usuarioRepository: Repository<Usuario>, logRepository: Repository<Log>);
    uploadFile(fileBuffer: Buffer): Promise<{
        message: string;
    }>;
    getComisionesPorTipoComision(user: any, id: string): Promise<{
        data: any[];
        total: number;
        tipoComision?: undefined;
    } | {
        data: Comision[];
        tipoComision: TipoComision;
        total?: undefined;
    } | {
        data: Comision[];
        total: number;
        tipoComision: TipoComision;
    }>;
    findAll(user: any): Promise<{
        data: Comision[];
        total: number;
    }>;
    getComisionesPaginadas(pagina: number, limite: number, orden: 'ASC' | 'DESC'): Promise<{
        data: Comision[];
        total: number;
    }>;
    buscarEnUnaComisionEstandar(user: any, palabraClave: string, pagina: number, tamanoPagina: number, fechaInicial?: Date, fechaFinal?: Date, comisionId?: string, filtroOrdenamiento?: any): Promise<{
        resultados: any[];
        total: number;
        comision?: undefined;
    } | {
        resultados: any[];
        total: number;
        comision: Comision;
    }>;
    buscarEnUnaComision(comisionId: string, palabraClave: string, pagina: number, tamanoPagina: number, fechaInicial?: Date, fechaFinal?: Date, filtroOrdenamiento?: any): Promise<{
        resultados: any[];
        total: number;
        comision?: undefined;
    } | {
        resultados: any[];
        total: number;
        comision: Comision;
    }>;
    buscarEnTodasLasComisiones(palabraClave: string, pagina: number, tamanoPagina: number, fechaInicial?: Date, fechaFinal?: Date): Promise<{
        resultados: any[];
        total: number;
        comisiones?: undefined;
        totalComisiones?: undefined;
    } | {
        resultados: any[];
        total: number;
        comisiones: Comision[];
        totalComisiones: number;
    }>;
    getSesionesPorComision(user: any, id: string, page: number, limit: number, filtroOrdenamiento?: any): Promise<{
        resultados: any[];
        total: number;
        comision?: undefined;
    } | {
        resultados: any[];
        total: number;
        comision: Comision;
    }>;
}
