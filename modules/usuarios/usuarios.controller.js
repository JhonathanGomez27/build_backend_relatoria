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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../iam/guards/jwt-auth.guard");
const decorators_1 = require("../iam/decorators");
const roles_guard_1 = require("../iam/guards/roles.guard");
const roles_model_1 = require("../iam/models/roles.model");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async logout(req) {
        const user = req.user;
        return await this.usuariosService.logout(user);
    }
    create(req, createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto, req.user);
    }
    update(id, updateUsuarioDto, req) {
        return this.usuariosService.update(+id, updateUsuarioDto, req.user);
    }
    findAll(req, query) {
        return this.usuariosService.findAll(req.user, query.page, query.limit);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)("logout"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('editar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usuario_dto_1.UpdateUsuarioDto, Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map