/// <reference types="multer" />
import { TranscripcionesService } from './transcripciones.service';
export declare class TranscripcionesController {
    private readonly transcripcionesService;
    constructor(transcripcionesService: TranscripcionesService);
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
