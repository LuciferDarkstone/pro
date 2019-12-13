import { DB_MODEL_TOKEN_SUFFIX, DB_CONNECTION_TOKEN } from 'src/config/constant';
import { Typegoose, GetModelForClassOptions, ModelType } from 'typegoose';
import { Provider, Inject } from '@nestjs/common';
import { Connection } from 'mongoose';

type TypegooseClass<T extends Typegoose> = new (...args: any[]) => T;

export function getModelToken(modelName: string): string {
    return modelName + DB_MODEL_TOKEN_SUFFIX;
}

export function getModelBySchema<T extends Typegoose>(
    typegooseClass: TypegooseClass<T>,
    schemaOptions: GetModelForClassOptions = {},
): ModelType<T> {
    return new typegooseClass().getModelForClass(typegooseClass, schemaOptions);
}

export function getProviderByModel<T>(model: ModelType<T>): Provider<T> {
    return {
        provide: getModelToken(model.modelName),
        useFactory: (connection: Connection) => model,
        inject: [DB_CONNECTION_TOKEN],
    };
}

export function getProviderBySchema<T extends Typegoose>(
    typegooseClass: TypegooseClass<T>,
    schemaOptions: GetModelForClassOptions = {},
): Provider<T> {
    return getProviderByModel(getModelBySchema(typegooseClass, schemaOptions));
}

export function InjectModel<T extends Typegoose>(model: TypegooseClass<T>) {
    return Inject(getModelToken(model.name));
}
