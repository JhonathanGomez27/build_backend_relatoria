import { Comision } from "src/modules/comisiones/entities/comision.entity";
export declare enum rolEnum {
    RELATOR = "relator",
    ADMIN = "admin"
}
export declare class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: 'admin' | 'relator';
    password: string;
    comision: Comision;
    comision_id: string;
    login_status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
