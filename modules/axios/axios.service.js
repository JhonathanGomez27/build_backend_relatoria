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
exports.AxiosService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
const axios_1 = require("axios");
let AxiosService = class AxiosService {
    constructor(configSerivce) {
        this.configSerivce = configSerivce;
        this.url_api = '';
        this.url_api = this.configSerivce.session.api_url;
        this.axiosinstance = axios_1.default.create({
            baseURL: this.url_api,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    async getSesiones() {
        try {
            const response = await this.axiosinstance.get('sesiones/listaSesionesRevisadas');
            if (response.status === 200) {
                return { ok: true, data: response.data };
            }
            return { ok: false, data: 'Error al obtener las sesiones' };
        }
        catch (error) {
            return { ok: false, data: 'Error al obtener las sesiones' };
        }
    }
    async getTranscripciones(idSesion) {
        try {
            const response = await this.axiosinstance.get(`sesiones/transcripcionesSesion?idSesion=${idSesion}`);
            if (response.status === 200) {
                return { ok: true, data: response.data };
            }
            return { ok: false, data: 'Error al obtener las transcripciones' };
        }
        catch (error) {
            return { ok: false, data: 'Error al obtener las transcripciones' };
        }
    }
    async sincronizarSesiones(idSesion) {
        try {
            const response = await this.axiosinstance.post(`sesiones/sincronizarSesion`, { idSesion: idSesion });
            if (response.status === 200) {
                return { ok: true, data: response.data };
            }
            return { ok: false, data: 'Error al sincronizar la sesión' };
        }
        catch (error) {
            return { ok: false, data: 'Error al sincronizar la sesión' };
        }
    }
};
exports.AxiosService = AxiosService;
exports.AxiosService = AxiosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], AxiosService);
//# sourceMappingURL=axios.service.js.map