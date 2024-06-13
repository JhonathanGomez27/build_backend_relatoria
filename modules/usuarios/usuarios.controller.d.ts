import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    logout(req: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    create(req: any, createUsuarioDto: CreateUsuarioDto): Promise<{
        data: any[];
        total: number;
        ok?: undefined;
        message?: undefined;
    } | {
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    }>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto, req: any): Promise<{
        data: any[];
        total: number;
        ok?: undefined;
        message?: undefined;
    } | {
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    }>;
    findAll(req: any, query: FiltersPaginatedQuery): Promise<{
        data: import("./entities/usuario.entity").Usuario[];
        total: number;
    }>;
}
