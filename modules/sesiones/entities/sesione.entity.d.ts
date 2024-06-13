import { Comision } from "src/modules/comisiones/entities/comision.entity";
export declare class Sesion {
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
}
