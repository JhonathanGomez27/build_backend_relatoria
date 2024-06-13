"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_controller_1 = require("./usuarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const hashing_service_1 = require("../../providers/hashing.service");
const bcrypt_service_1 = require("../../providers/bcrypt.service");
const iam_module_1 = require("../iam/iam.module");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const log_entity_1 = require("../logs/entities/log.entity");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, comision_entity_1.Comision, log_entity_1.Log]),
            iam_module_1.IamModule
        ],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService
            },
            usuarios_service_1.UsuariosService
        ],
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map