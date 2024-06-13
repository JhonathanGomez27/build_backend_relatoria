import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { HashingService } from 'src/providers/hashing.service';
import { Comision } from '../comisiones/entities/comision.entity';
import { Log } from '../logs/entities/log.entity';
export declare class UsuariosService {
    private usuarioRepository;
    private readonly hashingService;
    private comsiionRepository;
    private logRepository;
    constructor(usuarioRepository: Repository<Usuario>, hashingService: HashingService, comsiionRepository: Repository<Comision>, logRepository: Repository<Log>);
    onModuleInit(): Promise<void>;
    private createDefaultUser;
    logout(user: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    create(createUsuarioDto: CreateUsuarioDto, usuariLogueado: Usuario): Promise<{
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
    update(id: number, updateUsuarioDto: UpdateUsuarioDto, usuariLogueado: Usuario): Promise<{
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
    findAll(user: Usuario, pagina: number, limite: number): Promise<{
        data: Usuario[];
        total: number;
    }>;
}
