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
exports.ComisionesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const comisiones_service_1 = require("./comisiones.service");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const decorators_1 = require("../iam/decorators");
const roles_model_1 = require("../iam/models/roles.model");
const jwt_auth_guard_1 = require("../iam/guards/jwt-auth.guard");
const roles_guard_1 = require("../iam/guards/roles.guard");
const palabraClave_1 = require("../../common/palabraClave");
let ComisionesController = class ComisionesController {
    constructor(comisionesService) {
        this.comisionesService = comisionesService;
    }
    async uploadFile(file) {
        const fileBuffer = file.buffer;
        return this.comisionesService.uploadFile(fileBuffer);
    }
    async getComisionesByTipo(req, id) {
        return this.comisionesService.getComisionesPorTipoComision(req.user, id);
    }
    async findAll(req) {
        return this.comisionesService.findAll(req.user);
    }
    async getProgramasPaginadas(query) {
        return this.comisionesService.getComisionesPaginadas(query.page, query.limit, query.orden);
    }
    buscarEnUnaComision(req, query, body) {
        return this.comisionesService.buscarEnUnaComisionEstandar(req.user, body.palabraClave, query.page, query.limit, query.fechaInicio, query.fechaFin, body.comisionId, body.filtroOrdenamiendo);
    }
    buscarEnTodasLasComisiones(query, body) {
        console.log(body);
        return this.comisionesService.buscarEnTodasLasComisiones(body.palabraClave, query.page, query.limit, query.fechaInicio, query.fechaFin);
    }
    getSesionesPorComision(req, id, query, body) {
        return this.comisionesService.getSesionesPorComision(req.user, id, query.page, query.limit, body.filtroOrdenamiendo);
    }
};
exports.ComisionesController = ComisionesController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('/subir-archivo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('archivo')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "uploadFile", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.RELATOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('/find-by-tipo-comision/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "getComisionesByTipo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('/paginados'),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'orden', type: String, required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "getProgramasPaginadas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', type: Date, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', type: Date, required: false }),
    (0, common_1.Post)('buscarEnUnaComision'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery,
        palabraClave_1.PalabraClave]),
    __metadata("design:returntype", void 0)
], ComisionesController.prototype, "buscarEnUnaComision", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', type: Date, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', type: Date, required: false }),
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('buscarEnTodasLasComisiones'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtersPaginatedQuery_1.FiltersPaginatedQuery,
        palabraClave_1.PalabraClave]),
    __metadata("design:returntype", void 0)
], ComisionesController.prototype, "buscarEnTodasLasComisiones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Post)('getSesionesPorComision/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, filtersPaginatedQuery_1.FiltersPaginatedQuery,
        palabraClave_1.PalabraClave]),
    __metadata("design:returntype", void 0)
], ComisionesController.prototype, "getSesionesPorComision", null);
exports.ComisionesController = ComisionesController = __decorate([
    (0, swagger_1.ApiTags)('comisiones'),
    (0, common_1.Controller)('comisiones'),
    __metadata("design:paramtypes", [comisiones_service_1.ComisionesService])
], ComisionesController);
//# sourceMappingURL=comisiones.controller.js.map