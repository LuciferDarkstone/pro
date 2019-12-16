export enum EHttpStatus {
    Error = 'error',
    Success = 'success',
}

export type TMessage = string;

export type TExceptionOption = TMessage | {
    message: TMessage;
    error?: any;
};

export interface IHttpResultPaginate<T> {
    data: T;
    params: any;
    pagination: {
        total: number,
        curPage: number,
        totalPage: number,
        perPage: number,
    };
}

export interface IHttpResponseBase {
    status: EHttpStatus;
    message: TMessage;
}

export type THttpErrorResponse = IHttpResponseBase & {
    error: any;
    debug?: string;
};

export type THttpSuccessResponse<T> = IHttpResponseBase & {
    result: T | IHttpResultPaginate<T>;
};

export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;
