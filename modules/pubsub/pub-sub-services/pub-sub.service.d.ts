/// <reference types="node" />
import { EventEmitter } from 'events';
import { Sesion } from 'src/modules/sesiones/entities/sesione.entity';
import { Transcripcion } from 'src/modules/transcripciones/entities/transcripcione.entity';
import { Repository } from 'typeorm';
import { AxiosService } from 'src/modules/axios/axios.service';
import { GenerateFilesService } from 'src/modules/generate-files/generate-files.service';
export declare class PubSubService extends EventEmitter {
    private readonly axiosService;
    private readonly generateFilesService;
    private sesionRepository;
    private transcripcionRepository;
    constructor(axiosService: AxiosService, generateFilesService: GenerateFilesService, sesionRepository: Repository<Sesion>, transcripcionRepository: Repository<Transcripcion>);
    publish(topic: string, data?: any): void;
    subscribe(topic: string, handler: (...args: any[]) => void): void;
    unsubscribe(topic: string, handler: (...args: any[]) => void): void;
    cronArchivos(): Promise<{
        message: string;
    }>;
    cronGetSesiones(): Promise<void>;
    escaparCaracteres(texto: any): Promise<any>;
    fechaFormatter(fechaSesion: string): Promise<string>;
    getHoraActual(): string;
}
