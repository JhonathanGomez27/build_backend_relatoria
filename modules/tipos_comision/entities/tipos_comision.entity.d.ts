import { Comision } from "src/modules/comisiones/entities/comision.entity";
export declare class TipoComision {
    id: string;
    title: string;
    code: string;
    imageUrl: string;
    comisiones: Comision[];
    createdAt: Date;
    updatedAt: Date;
}
