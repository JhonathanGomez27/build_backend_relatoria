"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('relatorias');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const config = new swagger_1.DocumentBuilder().setTitle('Admin Relatorias API').setDescription('API para el manejo de relatorias').setVersion('1.0').addTag('relatorias').build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('relatorias/docs', app, document);
    console.log('Api corriendo correctamente', process.env.NODE_ENV);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map