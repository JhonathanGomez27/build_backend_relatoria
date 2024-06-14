/// <reference types="node" />
import { EventEmitter } from 'events';
import { Sesion } from 'src/modules/sesiones/entities/sesione.entity';
import { Transcripcion } from 'src/modules/transcripciones/entities/transcripcione.entity';
import { Repository } from 'typeorm';
export declare class PubSubService extends EventEmitter {
    private sesionRepository;
    private transcripcionRepository;
    constructor(sesionRepository: Repository<Sesion>, transcripcionRepository: Repository<Transcripcion>);
    publish(topic: string, data?: any): void;
    subscribe(topic: string, handler: (...args: any[]) => void): void;
    unsubscribe(topic: string, handler: (...args: any[]) => void): void;
    cronArchivos(): Promise<{
        message: string;
    }>;
    escaparCaracteres(texto: any): Promise<any>;
}
