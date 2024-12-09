import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors({ origin: "http://localhost:4200", credentials: true });

	app.use(
		session({
			secret: configService.get<string>("sessionSecret"),
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: false,
				httpOnly: true,
				sameSite: "lax"
			},
		})
	);

	await app.listen(configService.get<number>("port"));
}
bootstrap();
