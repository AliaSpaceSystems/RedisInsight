import { Module } from '@nestjs/common';
import { DatabaseClientFactory } from 'src/modules/database/providers/database.client.factory';
import { DatabaseAnalytics } from 'src/modules/database/database.analytics';
import { ListModule } from 'src/modules/browser/list/list.module';
import { HashModule } from 'src/modules/browser/hash/hash.module';
import { ZSetModule } from 'src/modules/browser/z-set/z-set.module';
import { StringModule } from 'src/modules/browser/string/string.module';
import { SetModule } from 'src/modules/browser/set/set.module';
import { BrowserHistoryModule } from 'src/modules/browser/browser-history/browser-history.module';
import { RejsonRlModule } from 'src/modules/browser/rejson-rl/rejson-rl.module';
import { StreamModule } from 'src/modules/browser/stream/stream.module';
import { RedisearchModule } from 'src/modules/browser/redisearch/redisearch.module';
import { KeysModule } from 'src/modules/browser/keys/keys.module';
import { BrowserToolService } from './services/browser-tool/browser-tool.service';
import { BrowserToolClusterService } from './services/browser-tool-cluster/browser-tool-cluster.service';

const route = '/databases/:dbInstance';

@Module({
  imports: [
    ListModule.register({ route }),
    HashModule.register({ route }),
    ZSetModule.register({ route }),
    StringModule.register({ route }),
    SetModule.register({ route }),
    BrowserHistoryModule.register({ route }),
    StreamModule.register({ route }),
    RejsonRlModule.register({ route }),
    RedisearchModule.register({ route }),
    KeysModule.register({ route }),
  ],
  providers: [],
  exports: [BrowserHistoryModule],
})
export class BrowserModule {}
