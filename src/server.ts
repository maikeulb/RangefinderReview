import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as expressApp from './app';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, expressApp);
  const port = 3000;
  await app.listen(port, () => {
    console.log("app is listening on port " + port);
  });
}
bootstrap();
