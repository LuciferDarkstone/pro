import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleProvider } from './article.model';
import { ArticleService } from './article.service';

@Module({
    controllers: [ArticleController],
    providers: [ArticleProvider, ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {}
