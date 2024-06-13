import { Sesion } from "src/modules/sesiones/entities/sesione.entity";
export declare class Transcripcion {
    clavePrincipal: string;
    sesion: Sesion;
    id_sesion: string;
    textoOriginal: string;
    texto: string;
    minuto: number;
    createdAt: Date;
    updatedAt: Date;
}
