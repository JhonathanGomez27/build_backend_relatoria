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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const authentication_common_service_1 = require("./authentication.common.service");
const error_message_1 = require("../../../utils/error.message");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const log_entity_1 = require("../../logs/entities/log.entity");
let AuthenticationService = class AuthenticationService {
    constructor(authcommonService, logRepository) {
        this.authcommonService = authcommonService;
        this.logRepository = logRepository;
    }
    async signIn(payload) {
        try {
            const data = { id: payload.id, rol: payload.rol };
            const [accessToken, refreshToken] = await Promise.all([
                this.authcommonService.generateJwtAccessToken(data),
                this.authcommonService.generateJwtRefreshoken(data)
            ]);
            payload.password = undefined;
            await this.authcommonService.updateUserLoginStatus(payload.id, true);
            const user = await this.authcommonService.findUserAutenticated(payload.id);
            user.password = undefined;
            const log = this.logRepository.create({
                accion: 'iniciar sesion',
                usuario: user.nombre + ' ' + user.apellido
            });
            await this.logRepository.save(log);
            return {
                message: "Acceso autorizado",
                accessToken,
                refreshToken,
                user: user
            };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async generateNewAccessToken(payload, refreshToken) {
        try {
            const data = { id: payload.id, rol: payload.rol };
            const accesstoken = await this.authcommonService.generateJwtAccessToken(data);
            const user = await this.authcommonService.findUserAutenticated(payload.id);
            user.password = undefined;
            user.login_status = true;
            return {
                message: "Acceso autorizado",
                accesstoken,
                refreshToken,
                user
            };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [authentication_common_service_1.AuthenticationCommonService,
        typeorm_2.Repository])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map