"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const config_2 = require("./config");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const tipos_comision_module_1 = require("./modules/tipos_comision/tipos_comision.module");
const iam_module_1 = require("./modules/iam/iam.module");
const comisiones_module_1 = require("./modules/comisiones/comisiones.module");
const sesiones_module_1 = require("./modules/sesiones/sesiones.module");
const transcripciones_module_1 = require("./modules/transcripciones/transcripciones.module");
const logs_module_1 = require("./modules/logs/logs.module");
const pubsub_module_1 = require("./modules/pubsub/pubsub.module");
const schedule_module_1 = require("./modules/schedule/schedule.module");
const axios_module_1 = require("./modules/axios/axios.module");
const generate_files_module_1 = require("./modules/generate-files/generate-files.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
            }),
            database_module_1.DatabaseModule,
            usuarios_module_1.UsuariosModule,
            iam_module_1.IamModule,
            tipos_comision_module_1.TiposComisionModule,
            comisiones_module_1.ComisionesModule,
            sesiones_module_1.SesionesModule,
            transcripciones_module_1.TranscripcionesModule,
            logs_module_1.LogsModule,
            schedule_module_1.ScheduleAppModule,
            pubsub_module_1.PubsubModule,
            axios_module_1.AxiosModule,
            generate_files_module_1.GenerateFilesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map