import { IsInt, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { prop, pre, Typegoose, plugin } from 'typegoose';
import { Types } from 'mongoose';
import { getModelBySchema, getProviderByModel } from 'src/utils/transform';
import { mongoosePaginate, mongooseAutoIncrement } from 'src/utils/mongoose';

export class Meta {
    @IsInt()
    @prop({ default: 0 })
    likes: number;

    @IsInt()
    @prop({ default: 0 })
    views: number;

    @IsInt()
    @prop({ default: 0 })
    comments: number;
}

@pre<Article>('findOneAndUpdate', function(next) {
    this.findOneAndUpdate({}, { update_at: Date.now() });
    next();
})

@plugin(mongoosePaginate)
@plugin(mongooseAutoIncrement.plugin, {
    model: Article.name,
    field: 'id',
    startAt: 1,
    incrementBy: 1,
})

export class Article extends Typegoose {

    @IsNotEmpty({ message: '标题？' })
    @IsString({ message: '字符串？' })
    @prop({ required: true, validate: /\S+/ })
    title: string;

    @IsNotEmpty({ message: '内容？' })
    @IsString({ message: '字符串？' })
    @prop({ required: true, validate: /\S+/ })
    content: string;

    @prop()
    get t_content() {
        const content = this.content;
        return content ? content.substr(0, 30) : content;
    }

    @prop()
    meta: Meta;

    @prop({ default: Date.now })
    create_at?: Date;

    @prop({ default: Date.now })
    update_at?: Date;

}

export class DelArticles extends Typegoose {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    article_ids: Types.ObjectId[];
}

export function getDefaultMeta(): Meta {
    return {
        likes: 0,
        views: 0,
        comments: 0,
    };
}

export const ArticleModel = getModelBySchema(Article, {
    schemaOptions: {
        toObject: {
            getters: true,
        },
    },
});

export const ArticleProvider = getProviderByModel(ArticleModel);
