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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.logEnum = void 0;
const typeorm_1 = require("typeorm");
var logEnum;
(function (logEnum) {
    logEnum["CERRAR_SESION"] = "cerrar sesion";
    logEnum["INICIAR_SESION"] = "iniciar sesion";
    logEnum["CREAR_USUARIO"] = "crear usuario";
    logEnum["ELIMINAR_USUARIO"] = "eliminar usuario";
    logEnum["EDITAR_USUARIO"] = "editar usuario";
    logEnum["CONSULTA_COMISION"] = "consulta comision";
    logEnum["CONSULTA_SESION"] = "consulta sesion";
    logEnum["DESCARGA_MULTIMEDIA"] = "descarga multimedia";
})(logEnum || (exports.logEnum = logEnum = {}));
let Log = class Log {
};
exports.Log = Log;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: logEnum,
    }),
    __metadata("design:type", String)
], Log.prototype, "accion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Log.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Log.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Log.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Log.prototype, "updatedAt", void 0);
exports.Log = Log = __decorate([
    (0, typeorm_1.Entity)({ name: 'logs' })
], Log);
//# sourceMappingURL=log.entity.js.map