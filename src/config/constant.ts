import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

export const DB_CONNECTION_TOKEN = 'DbConnectionToken';
export const DB_MODEL_TOKEN_SUFFIX = 'ModelToken';

export const APP = {
    LIMIT: 20,
    MONGODB: {
        uri: `mongodb://127.0.0.1:27017/pro`,
        username: 'dbname',
        password: 'dbpwd',
    },
};

export const META = {
    HTTP_ERROR_CODE: '__customHttpErrorCode__',
    HTTP_SUCCESS_CODE: HTTP_CODE_METADATA,
    HTTP_MESSAGE: '__customHttpMessage__',
    HTTP_ERROR_MESSAGE: '__customHttpErrorMessage__',
    HTTP_SUCCESS_MESSAGE: '__customHttpSuccessMessage__',
    HTTP_RES_TRANSFORM_PAGINATE: '__customHttpResTransformPagenate__',
};

export const TEXT = {

    HTTP_ERROR_SUFFIX: '失败',
    HTTP_SUCCESS_SUFFIX: '成功',
    HTTP_DEFAULT_TEXT: '数据请求',
    HTTP_DEFAULT_ERROR_TEXT: '数据请求失败',
    HTTP_DEFAULT_SUCCESS_TEXT: '数据请求成功',

    HTTP_ANONYMOUSE_TEXT: '来者何人',
    HTTP_UNAUTHORIZED_TEXT_DEFAULT: '权限验证失败',
    HTTP_BAD_REQUEST_TEXT_DEFAULT: '未知错误',
    HTTP_PARAMS_PERMISSION_ERROR_DEFAULT: '无权使用参数',

    VALIDATION_ERROR_DEFAULT: '参数验证失败',

};
