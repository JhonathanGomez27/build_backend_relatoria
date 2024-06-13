import { TipoComision } from "src/modules/tipos_comision/entities/tipos_comision.entity";
export declare class Comision {
    id: string;
    title: string;
    description: string;
    theme: string;
    tipo_comision: TipoComision[];
    presidente: string;
    vicepresidente: string;
    secretario: string;
    subsecretario: string;
    createdAt: Date;
    updatedAt: Date;
}
