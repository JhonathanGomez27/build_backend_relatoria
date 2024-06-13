/// <reference types="multer" />
import { TiposComisionService } from './tipos_comision.service';
export declare class TiposComisionController {
    private readonly tiposComisionService;
    constructor(tiposComisionService: TiposComisionService);
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findAll(req: any): Promise<{
        data: import("./entities/tipos_comision.entity").TipoComision[];
        total: number;
    }>;
}
