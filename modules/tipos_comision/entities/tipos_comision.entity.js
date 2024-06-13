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
exports.TipoComision = void 0;
const comision_entity_1 = require("../../comisiones/entities/comision.entity");
const typeorm_1 = require("typeorm");
let TipoComision = class TipoComision {
};
exports.TipoComision = TipoComision;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true }),
    __metadata("design:type", String)
], TipoComision.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TipoComision.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TipoComision.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TipoComision.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => comision_entity_1.Comision, comision => comision.tipo_comision),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], TipoComision.prototype, "comisiones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TipoComision.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TipoComision.prototype, "updatedAt", void 0);
exports.TipoComision = TipoComision = __decorate([
    (0, typeorm_1.Entity)({ name: 'tipos_comision' })
], TipoComision);
//# sourceMappingURL=tipos_comision.entity.js.map