import { Module, Global } from '@nestjs/common';
import { databaseProvider } from './database';

@Global()
@Module({
    providers: [databaseProvider],
    exports: [databaseProvider],
})
export class DatabaseModule {}
