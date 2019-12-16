import { Types } from 'mongoose';
import { createParamDecorator } from '@nestjs/common';
import { isString } from 'util';

export enum EQueryParamsField {
    Page = 'page',
    PerPage = 'perPage',
    Sort = 'sort',
    Date = 'data',
    Keyword = 'keyword',
    State = 'state',
    Public = 'public',
    Origin = 'origin',
    ParamsId = 'paramsId',
    CommentState = 'commentState',
}

export interface IQueryParamsConfig {
    [key: string]: string | number | boolean | Types.ObjectId | Date | RegExp |IQueryParamsConfig;
}

export interface IQueryParamsResult {
    querys: IQueryParamsConfig;
    options: IQueryParamsConfig;
    params: IQueryParamsConfig;
    origin: IQueryParamsConfig;
    request: any;
    visitors: {
        ip: string,
        ua: string,
        referer: string,
    };
    isAuthenticated: boolean;
}

interface ITransformConfigObject {
    [key: string]: string | number | boolean;
}

export type TTransformConfig = EQueryParamsField | string | ITransformConfigObject;

interface IValidateError {
    name: string;
    field: EQueryParamsField;
    isAllowed: boolean;
    isIllegal: boolean;
    setValue(): void;
}

export const QueryParams = createParamDecorator(

    (customConfig: TTransformConfig[], request: any): IQueryParamsResult => {
        const isAuthenticated = request.isAuthenticated();

        const transformConfig: IQueryParamsConfig = {
            [EQueryParamsField.Page]: 1,
            [EQueryParamsField.PerPage]: true,
            [EQueryParamsField.ParamsId]: 'id',
            [EQueryParamsField.Sort]: true,
        };

        if (customConfig) {
            customConfig.forEach(field => {

                if (isString(field)) {
                    transformConfig[field] = true;
                }

                if (isString(field)) {
                    Object.assign(transformConfig, field);
                }

            });

        }

        const querys: IQueryParamsConfig = {};

        const options: IQueryParamsConfig = {};

        const params: IQueryParamsConfig = Object.assign({ url: request.url }, request.params); // lodash.merge 合并参数

        const { date } = request.query;

        const paramsId = request.params[transformConfig.paramsId as string];

        const [page, perPage, sort, state, ppublic, origin] = [
            request.query.page || transformConfig.page,
            request.query.perPage,
            request.query.sort,
            request.query.state,
            request.query.public,
            request.query.origin,
        ].map(item => item !== null ? Number(item) : item);

        return null; // not finished
    },

);
