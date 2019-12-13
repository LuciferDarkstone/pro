import { Controller, Get, Req, Post, Header, Redirect, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from './article.service';
import { PaginateResult } from 'mongoose';
import { Article } from './article.model';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    getArticles(): Promise<PaginateResult<Article>> {
        return this.articleService.getList();
    }

    @Post()
    createArticle(@Body() article: Article): Promise<Article> {
        return this.articleService.create(article);
    }

    @Get(':id')
    getArticle(@Param() param: any): Promise<Article> {
        const { id } = param;
        const isObjectId = isNaN(Number(id));
        return isObjectId ?
            this.articleService.getDetailByObjectId(id)
                : this.articleService.getFullDetailForUser(id);
    }
}
