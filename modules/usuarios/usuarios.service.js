"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const hashing_service_1 = require("../../providers/hashing.service");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const log_entity_1 = require("../logs/entities/log.entity");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepository, hashingService, comsiionRepository, logRepository) {
        this.usuarioRepository = usuarioRepository;
        this.hashingService = hashingService;
        this.comsiionRepository = comsiionRepository;
        this.logRepository = logRepository;
    }
    async onModuleInit() {
        const userCount = await this.usuarioRepository.count();
        if (userCount === 0) {
            await this.createDefaultUser();
        }
    }
    async createDefaultUser() {
        const defaultUser = new usuario_entity_1.Usuario();
        defaultUser.email = 'admin@admin.com';
        defaultUser.nombre = 'admin';
        defaultUser.apellido = 'staff';
        defaultUser.password = await this.hashingService.hash('Abcd1234.');
        defaultUser.rol = 'admin';
        await this.usuarioRepository.save(defaultUser);
    }
    async logout(user) {
        const userLogout = await this.usuarioRepository.findOne({ where: { id: user.id } });
        if (!userLogout) {
            return {
                ok: false,
                message: "usuario no encontrado"
            };
        }
        const log = this.logRepository.create({
            accion: 'cerrar sesion',
            usuario: userLogout.nombre + ' ' + userLogout.apellido
        });
        await this.logRepository.save(log);
        userLogout.login_status = false;
        await this.usuarioRepository.save(userLogout);
        return {
            ok: true,
            message: "sesion cerrada con exito"
        };
    }
    async create(createUsuarioDto, usuariLogueado) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuariLogueado.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'crear usuario',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        const user = await this.usuarioRepository.findOne({ where: { email: createUsuarioDto.email } });
        if (user) {
            return {
                ok: false,
                message: "El email ya esta registrado"
            };
        }
        const comision = await this.comsiionRepository.findOne({ where: { id: createUsuarioDto.comision_id } });
        if (!comision) {
            return {
                ok: false,
                message: "Comision no encontrada"
            };
        }
        const newUser = new usuario_entity_1.Usuario();
        newUser.email = createUsuarioDto.email;
        newUser.nombre = createUsuarioDto.nombre;
        newUser.apellido = createUsuarioDto.apellido;
        newUser.password = await this.hashingService.hash(createUsuarioDto.password);
        newUser.rol = createUsuarioDto.rol;
        if (createUsuarioDto.rol != 'admin') {
            newUser.comision_id = createUsuarioDto.comision_id;
        }
        await this.usuarioRepository.save(newUser);
        return {
            ok: true,
            message: "Usuario creado con exito"
        };
    }
    async update(id, updateUsuarioDto, usuariLogueado) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuariLogueado.id } });
        if (!usuario) {
            return { data: [], total: 0 };
        }
        const log = this.logRepository.create({
            accion: 'editar usuario',
            usuario: usuario.nombre + ' ' + usuario.apellido
        });
        await this.logRepository.save(log);
        const user = await this.usuarioRepository.findOne({ where: { id: id } });
        if (!user) {
            return {
                ok: false,
                message: "Usuario no encontrado"
            };
        }
        if (updateUsuarioDto.email) {
            const userEmail = await this.usuarioRepository.findOne({ where: { email: updateUsuarioDto.email } });
            if (userEmail && userEmail.id != id) {
                return {
                    ok: false,
                    message: "El email ya esta registrado"
                };
            }
            user.email = updateUsuarioDto.email;
        }
        if (updateUsuarioDto.nombre) {
            user.nombre = updateUsuarioDto.nombre;
        }
        if (updateUsuarioDto.apellido) {
            user.apellido = updateUsuarioDto.apellido;
        }
        if (updateUsuarioDto.password) {
            user.password = await this.hashingService.hash(updateUsuarioDto.password);
        }
        if (updateUsuarioDto.rol) {
            user.rol = updateUsuarioDto.rol;
        }
        if (updateUsuarioDto.comision_id) {
            const comision = await this.comsiionRepository.findOne({ where: { id: updateUsuarioDto.comision_id } });
            if (!comision) {
                return {
                    ok: false,
                    message: "Comision no encontrada"
                };
            }
            user.comision_id = updateUsuarioDto.comision_id;
        }
        await this.usuarioRepository.save(user);
        return {
            ok: true,
            message: "Usuario actualizado con exito"
        };
    }
    async findAll(user, pagina, limite) {
        const [users, total] = await this.usuarioRepository.findAndCount({
            skip: (pagina - 1) * limite,
            take: limite
        });
        return {
            data: users,
            total: total
        };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_2.InjectRepository)(comision_entity_1.Comision)),
    __param(3, (0, typeorm_2.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        hashing_service_1.HashingService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map