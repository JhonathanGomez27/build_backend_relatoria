/// <reference types="node" />
import { TipoComision } from './entities/tipos_comision.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
export declare class TiposComisionService {
    private tipoComisionRepository;
    private usuarioRepository;
    constructor(tipoComisionRepository: Repository<TipoComision>, usuarioRepository: Repository<Usuario>);
    uploadFile(fileBuffer: Buffer): Promise<{
        message: string;
    }>;
    findAll(user: any): Promise<{
        data: TipoComision[];
        total: number;
    }>;
}
