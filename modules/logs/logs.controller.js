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
exports.LogsController = void 0;
const common_1 = require("@nestjs/common");
const logs_service_1 = require("./logs.service");
const create_log_dto_1 = require("./dto/create-log.dto");
const jwt_auth_guard_1 = require("../iam/guards/jwt-auth.guard");
const filtrosLogs_dto_1 = require("./dto/filtrosLogs.dto");
const roles_guard_1 = require("../iam/guards/roles.guard");
const decorators_1 = require("../iam/decorators");
const roles_model_1 = require("../iam/models/roles.model");
const swagger_1 = require("@nestjs/swagger");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
let LogsController = class LogsController {
    constructor(logsService) {
        this.logsService = logsService;
    }
    create(req, createLogDto) {
        return this.logsService.create(req.user, createLogDto);
    }
    getLogs(filtrosLogsDto, query) {
        return this.logsService.getLogs(filtrosLogsDto, query.page, query.limit);
    }
};
exports.LogsController = LogsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_log_dto_1.CreateLogDto]),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Post)('getLogs'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtrosLogs_dto_1.FiltrosLogsDto,
        filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "getLogs", null);
exports.LogsController = LogsController = __decorate([
    (0, common_1.Controller)('logs'),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsController);
//# sourceMappingURL=logs.controller.js.map