import { Module, Type } from '@nestjs/common';
import { ServerController } from 'src/modules/server/server.controller';
import { ServerService } from 'src/modules/server/server.service';
import { ServerRepository } from 'src/modules/server/repositories/server.repository';
import { LocalServerRepository } from 'src/modules/server/repositories/local.server.repository';
import { FeatureModule } from 'src/modules/feature/feature.module';
import { HealthController } from 'src/modules/server/health.controller';

@Module({})
export class ServerModule {
  static register(
    serverRepository: Type<ServerRepository> = LocalServerRepository,
  ) {
    return {
      module: ServerModule,
      controllers: [
        ServerController,
        HealthController,
      ],
      providers: [
        ServerService,
        {
          provide: ServerRepository,
          useClass: serverRepository,
        },
      ],
      imports: [FeatureModule],
      exports: [ServerService],
    };
  }
}
