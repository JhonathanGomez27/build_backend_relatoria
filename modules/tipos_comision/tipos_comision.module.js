"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposComisionModule = void 0;
const common_1 = require("@nestjs/common");
const tipos_comision_controller_1 = require("./tipos_comision.controller");
const tipos_comision_service_1 = require("./tipos_comision.service");
const tipos_comision_entity_1 = require("./entities/tipos_comision.entity");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const iam_module_1 = require("../iam/iam.module");
let TiposComisionModule = class TiposComisionModule {
};
exports.TiposComisionModule = TiposComisionModule;
exports.TiposComisionModule = TiposComisionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tipos_comision_entity_1.TipoComision, usuario_entity_1.Usuario]),
            iam_module_1.IamModule
        ],
        controllers: [tipos_comision_controller_1.TiposComisionController],
        providers: [tipos_comision_service_1.TiposComisionService]
    })
], TiposComisionModule);
//# sourceMappingURL=tipos_comision.module.js.map