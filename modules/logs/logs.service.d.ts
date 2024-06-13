import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FiltrosLogsDto } from './dto/filtrosLogs.dto';
export declare class LogsService {
    private logRepository;
    private usuarioRepository;
    constructor(logRepository: Repository<Log>, usuarioRepository: Repository<Usuario>);
    create(user: any, createLogDto: CreateLogDto): Promise<Log>;
    getLogs(filtrosLogsDto: FiltrosLogsDto, page: number, limit: number): Promise<{
        logs: any[];
        total: number;
    }>;
}
