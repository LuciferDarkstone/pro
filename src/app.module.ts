import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './modules/article/article.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ArticleModule],
  controllers: [AppController],
})
export class AppModule {}
