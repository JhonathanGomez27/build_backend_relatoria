"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_1 = require("./pub-sub-services/pub-sub.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesione_entity_1 = require("../sesiones/entities/sesione.entity");
const transcripcione_entity_1 = require("../transcripciones/entities/transcripcione.entity");
const axios_module_1 = require("../axios/axios.module");
const generate_files_module_1 = require("../generate-files/generate-files.module");
let PubsubModule = class PubsubModule {
};
exports.PubsubModule = PubsubModule;
exports.PubsubModule = PubsubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sesione_entity_1.Sesion, transcripcione_entity_1.Transcripcion]),
            axios_module_1.AxiosModule, generate_files_module_1.GenerateFilesModule
        ],
        providers: [pub_sub_service_1.PubSubService],
        exports: [pub_sub_service_1.PubSubService],
    })
], PubsubModule);
//# sourceMappingURL=pubsub.module.js.map