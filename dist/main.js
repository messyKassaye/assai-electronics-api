"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT ?? 5000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('A2SV E-Commerce API')
        .setDescription('API documentation for A2SV E-Commerce')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document);
    const origins = process.env.ORIGINS?.split(',').map(origin => origin.trim()) || [];
    app.enableCors({
        origin: origins,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(PORT);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`📘 Swagger docs available at: http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map