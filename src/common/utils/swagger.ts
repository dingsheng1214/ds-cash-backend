import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageConfig from '../../../package.json';

export const generateSwaggerDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api', app, document);
};
