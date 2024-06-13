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
exports.SesionesController = void 0;
const common_1 = require("@nestjs/common");
const sesiones_service_1 = require("./sesiones.service");
const platform_express_1 = require("@nestjs/platform-express");
const decorators_1 = require("../iam/decorators");
const roles_model_1 = require("../iam/models/roles.model");
const jwt_auth_guard_1 = require("../iam/guards/jwt-auth.guard");
const roles_guard_1 = require("../iam/guards/roles.guard");
const palabraClave_1 = require("../../common/palabraClave");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
let SesionesController = class SesionesController {
    constructor(sesionesService) {
        this.sesionesService = sesionesService;
    }
    async uploadFile(file) {
        const fileBuffer = file.buffer;
        return this.sesionesService.uploadFile(fileBuffer);
    }
    async findOne(id) {
        return this.sesionesService.findOne(id);
    }
    async buscarEnUnaSesion(id, body, query) {
        return this.sesionesService.buscarEnUnaSesion(id, body.palabraClave, query.page, query.limit, query.fechaInicio, query.fechaFin);
    }
    async obtenerSesionesComision(req, id, query) {
        return this.sesionesService.obtenerSesionesPorComision(req.user, id, query.page, query.limit);
    }
    async obtenerTranscripciones(req, id, query) {
        return this.sesionesService.obtenerTranscripciones(req.user, id, query.page, query.limit);
    }
};
exports.SesionesController = SesionesController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('/subir-archivo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('archivo')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('byId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', type: Date, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', type: Date, required: false }),
    (0, common_1.Post)('buscarEnUnaSesion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, palabraClave_1.PalabraClave,
        filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "buscarEnUnaSesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('getSesionesComision/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "obtenerSesionesComision", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('obtenerTranscripciones/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "obtenerTranscripciones", null);
exports.SesionesController = SesionesController = __decorate([
    (0, common_1.Controller)('sesiones'),
    __metadata("design:paramtypes", [sesiones_service_1.SesionesService])
], SesionesController);
//# sourceMappingURL=sesiones.controller.js.map