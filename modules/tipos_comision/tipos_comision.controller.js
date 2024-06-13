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
exports.TiposComisionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tipos_comision_service_1 = require("./tipos_comision.service");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../iam/guards/jwt-auth.guard");
const decorators_1 = require("../iam/decorators");
const roles_model_1 = require("../iam/models/roles.model");
const roles_guard_1 = require("../iam/guards/roles.guard");
let TiposComisionController = class TiposComisionController {
    constructor(tiposComisionService) {
        this.tiposComisionService = tiposComisionService;
    }
    async uploadFile(file) {
        const fileBuffer = file.buffer;
        return this.tiposComisionService.uploadFile(fileBuffer);
    }
    async findAll(req) {
        return this.tiposComisionService.findAll(req.user);
    }
};
exports.TiposComisionController = TiposComisionController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('/subir-archivo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('archivo')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiposComisionController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('/find-all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiposComisionController.prototype, "findAll", null);
exports.TiposComisionController = TiposComisionController = __decorate([
    (0, swagger_1.ApiTags)('tipos-comision'),
    (0, common_1.Controller)('tipos-comision'),
    __metadata("design:paramtypes", [tipos_comision_service_1.TiposComisionService])
], TiposComisionController);
//# sourceMappingURL=tipos_comision.controller.js.map