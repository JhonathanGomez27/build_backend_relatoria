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
exports.Transcripcion = void 0;
const sesione_entity_1 = require("../../sesiones/entities/sesione.entity");
const typeorm_1 = require("typeorm");
let Transcripcion = class Transcripcion {
};
exports.Transcripcion = Transcripcion;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true }),
    __metadata("design:type", String)
], Transcripcion.prototype, "clavePrincipal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sesione_entity_1.Sesion),
    (0, typeorm_1.JoinColumn)({ name: 'id_sesion' }),
    __metadata("design:type", sesione_entity_1.Sesion)
], Transcripcion.prototype, "sesion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transcripcion.prototype, "id_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transcripcion.prototype, "textoOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)('tsvector'),
    (0, typeorm_1.Index)('idx_transcripcion_texto_gin', {
        synchronize: false,
        fulltext: true,
        name: 'idx_transcripcion_texto_gin',
        unique: false,
        spatial: false,
        parser: 'pg_catalog.tsvector_ops',
        using: 'GIN',
        where: ''
    }),
    __metadata("design:type", String)
], Transcripcion.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Transcripcion.prototype, "minuto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Transcripcion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Transcripcion.prototype, "updatedAt", void 0);
exports.Transcripcion = Transcripcion = __decorate([
    (0, typeorm_1.Entity)({ name: 'transcripciones' })
], Transcripcion);
//# sourceMappingURL=transcripcione.entity.js.map