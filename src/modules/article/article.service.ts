import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions, Types } from 'mongoose';
import { InstanceType } from 'typegoose';
import { Article, getDefaultMeta } from './article.model';
import { InjectModel } from 'src/utils/transform';
import { TMongooseModel } from 'src/interfaces/mongoose.interface';

@Injectable()
export class ArticleService {
    private ArticleList: PaginateResult<Article>;

    constructor(
        @InjectModel(Article)
        private readonly articleModel: TMongooseModel<Article>,
    ) {}

    public getList(querys?: object, options?: PaginateOptions): Promise<PaginateResult<Article>> {
        return this.articleModel.paginate(querys, options);
    }

    public getDetailByObjectId(articleId: Types.ObjectId): Promise<Article> {
        return this.articleModel.findById(articleId).exec();
    }

    public getDetailByNumberId(articleId: number): Promise<InstanceType<Article>> {
        return this.articleModel
            .findOne({
                id: articleId,
            })
            .exec();
    }

    public async getFullDetailForUser(articleId: number): Promise<Article> {
        const article = await this.getDetailByNumberId(articleId);
        if (!article) {
            return Promise.reject('不存在');
        }
        article.meta.views++;
        article.save();
    }

    public async create(newArticle: Article): Promise<Article> {
        Object.assign(newArticle, { meta: getDefaultMeta() });
        const article = await new this.articleModel(newArticle)
            .save();
        return article;
    }

    public async update(articleId: Types.ObjectId, newArticle: Article): Promise<Article> {
        Reflect.deleteProperty(newArticle, 'meta');
        Reflect.deleteProperty(newArticle, 'create_at');
        Reflect.deleteProperty(newArticle, 'update_at');

        const article = await this.articleModel
            .findByIdAndUpdate(articleId, newArticle, { new: true })
            .exec();
        return article;
    }

    public async delete(articleId: Types.ObjectId): Promise<Article> {
        const article = await this.articleModel
            .findByIdAndRemove(articleId)
            .exec();
        return article;
    }

    public async batchDelete(articleIds: Types.ObjectId[]): Promise<any> {
        const result = await this.articleModel
            .deleteMany({ _id: { $in: articleIds } });
        return result;
    }
}
