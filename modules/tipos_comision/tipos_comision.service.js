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
exports.TiposComisionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipos_comision_entity_1 = require("./entities/tipos_comision.entity");
const typeorm_2 = require("typeorm");
const error_message_1 = require("../../utils/error.message");
const csv_converter_1 = require("../../utils/csv.converter");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let TiposComisionService = class TiposComisionService {
    constructor(tipoComisionRepository, usuarioRepository) {
        this.tipoComisionRepository = tipoComisionRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async uploadFile(fileBuffer) {
        try {
            const csvString = fileBuffer.toString('utf-8');
            const jsonData = await (0, csv_converter_1.CsvConverter)(csvString);
            const tiposComision = await Promise.all(jsonData.map(async (data) => {
                const nuevoTipoComision = new tipos_comision_entity_1.TipoComision();
                nuevoTipoComision.id = data.id;
                nuevoTipoComision.title = data.title;
                nuevoTipoComision.code = data.code;
                nuevoTipoComision.imageUrl = data.imageUrl;
                return nuevoTipoComision;
            }));
            for (let index = 0; index < tiposComision.length; index++) {
                const element = tiposComision[index];
                if (!element.id || element.id == '') {
                    continue;
                }
                await this.tipoComisionRepository.save(element);
            }
            return { message: 'Archivo procesado correctamente' };
        }
        catch (error) {
            const message = (0, error_message_1.handleDbError)(error);
            return { message };
        }
    }
    async findAll(user) {
        if (user.rol !== 'admin') {
            const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
            const comision = usuario.comision;
            const tipoComision = await this.tipoComisionRepository.findOne({ where: { comisiones: [comision] } });
            return { data: [tipoComision], total: 1 };
        }
        const [tiposComision, total] = await this.tipoComisionRepository.findAndCount();
        return { data: tiposComision, total };
    }
};
exports.TiposComisionService = TiposComisionService;
exports.TiposComisionService = TiposComisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipos_comision_entity_1.TipoComision)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TiposComisionService);
//# sourceMappingURL=tipos_comision.service.js.map