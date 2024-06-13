/// <reference types="multer" />
import { ComisionesService } from './comisiones.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
import { PalabraClave } from 'src/common/palabraClave';
export declare class ComisionesController {
    private readonly comisionesService;
    constructor(comisionesService: ComisionesService);
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    getComisionesByTipo(req: any, id: string): Promise<{
        data: any[];
        total: number;
        tipoComision?: undefined;
    } | {
        data: import("./entities/comision.entity").Comision[];
        tipoComision: import("../tipos_comision/entities/tipos_comision.entity").TipoComision;
        total?: undefined;
    } | {
        data: import("./entities/comision.entity").Comision[];
        total: number;
        tipoComision: import("../tipos_comision/entities/tipos_comision.entity").TipoComision;
    }>;
    findAll(req: any): Promise<{
        data: import("./entities/comision.entity").Comision[];
        total: number;
    }>;
    getProgramasPaginadas(query: FiltersPaginatedQuery): Promise<{
        data: import("./entities/comision.entity").Comision[];
        total: number;
    }>;
    buscarEnUnaComision(req: any, query: FiltersPaginatedQuery, body: PalabraClave): Promise<{
        resultados: any[];
        total: number;
        comision?: undefined;
    } | {
        resultados: any[];
        total: number;
        comision: import("./entities/comision.entity").Comision;
    }>;
    buscarEnTodasLasComisiones(query: FiltersPaginatedQuery, body: PalabraClave): Promise<{
        resultados: any[];
        total: number;
        comisiones?: undefined;
        totalComisiones?: undefined;
    } | {
        resultados: any[];
        total: number;
        comisiones: import("./entities/comision.entity").Comision[];
        totalComisiones: number;
    }>;
    getSesionesPorComision(req: any, id: string, query: FiltersPaginatedQuery, body: PalabraClave): Promise<{
        resultados: any[];
        total: number;
        comision?: undefined;
    } | {
        resultados: any[];
        total: number;
        comision: import("./entities/comision.entity").Comision;
    }>;
}
