/// <reference types="node" />
export declare class GenerateFilesService {
    imagen: string;
    minutoaminuto: {
        nombre: string;
        piezas: ({
            minuto: string;
            text?: undefined;
        } | {
            minuto: string;
            text: string;
        })[];
    };
    constructor();
    getRecordHTML(params: any): string;
    getRecordWordHTML(params: any): string;
    sesionToPDF(sesion: any): Promise<any>;
    sesionToWord(sesion: any): Promise<any>;
    minuteByMinuteToXML(mbm: any): Buffer;
    minuteByMinuteToSesionPieces(mbm: any): {
        fecha: string;
        titulo: any;
        subtitulo: string;
        piezas: any;
    };
    generateFiles(): Promise<void>;
}
