/// <reference types="node" />
import { Repository } from 'typeorm';
import { Transcripcion } from './entities/transcripcione.entity';
export declare class TranscripcionesService {
    private transcripcionRepository;
    constructor(transcripcionRepository: Repository<Transcripcion>);
    procesarArchivo(fileBuffer: Buffer): Promise<{
        message: string;
    }>;
    escaparCaracteres(texto: any): Promise<any>;
}
