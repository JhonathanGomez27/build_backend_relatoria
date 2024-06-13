"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesModule = void 0;
const common_1 = require("@nestjs/common");
const sesiones_service_1 = require("./sesiones.service");
const sesiones_controller_1 = require("./sesiones.controller");
const sesione_entity_1 = require("./entities/sesione.entity");
const typeorm_1 = require("@nestjs/typeorm");
const iam_module_1 = require("../iam/iam.module");
const transcripcione_entity_1 = require("../transcripciones/entities/transcripcione.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const comision_entity_1 = require("../comisiones/entities/comision.entity");
const log_entity_1 = require("../logs/entities/log.entity");
let SesionesModule = class SesionesModule {
};
exports.SesionesModule = SesionesModule;
exports.SesionesModule = SesionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sesione_entity_1.Sesion, transcripcione_entity_1.Transcripcion, usuario_entity_1.Usuario, comision_entity_1.Comision, log_entity_1.Log]),
            iam_module_1.IamModule
        ],
        controllers: [sesiones_controller_1.SesionesController],
        providers: [sesiones_service_1.SesionesService],
        exports: [sesiones_service_1.SesionesService]
    })
], SesionesModule);
//# sourceMappingURL=sesiones.module.js.map