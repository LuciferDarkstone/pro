import { HttpStatus, SetMetadata } from '@nestjs/common';
import { TMessage } from 'src/interfaces/http.interface';
import { META, TEXT } from 'src/config/constant';
import { isObject } from 'util';

interface IBuildDecoratorOption {
    errCode?: HttpStatus;
    successCode?: HttpStatus;
    errMessage?: TMessage;
    successMessage?: TMessage;
    usePaginate?: boolean;
}

interface IHandleOption {
    error: HttpStatus;
    success?: HttpStatus;
    message: TMessage;
    usePaginate?: boolean;
}

type THandleOption = TMessage | IHandleOption;

const buildHttpDecorator = (options: IBuildDecoratorOption): MethodDecorator => {
    const { errMessage, successMessage, errCode, successCode, usePaginate } = options;

    return (_, __, desciptor: PropertyDescriptor) => {

        if (errCode) {
            SetMetadata(META.HTTP_ERROR_CODE, errCode)(desciptor.value);
        }
        if (successCode) {
            SetMetadata(META.HTTP_SUCCESS_CODE, successCode)(desciptor.value);
        }
        if (errMessage) {
            SetMetadata(META.HTTP_ERROR_MESSAGE, errMessage)(desciptor.value);
        }
        if (successMessage) {
            SetMetadata(META.HTTP_SUCCESS_MESSAGE, successMessage)(desciptor.value);
        }
        if (usePaginate) {
            SetMetadata(META.HTTP_RES_TRANSFORM_PAGINATE, true)(desciptor.value);
        }

        return desciptor;
    };
};

export const error = (message: TMessage, statusCode?: HttpStatus): MethodDecorator => {
    return buildHttpDecorator({ errMessage: message, errCode: statusCode });
};

export const success = (message: TMessage, statusCode?: HttpStatus): MethodDecorator => {
    return buildHttpDecorator({ successMessage: message, successCode: statusCode });
};

export function handle(args: THandleOption): MethodDecorator;
export function handle(...args: any[]) {

    const option = args[0];
    const isOption = (value: THandleOption): value is IHandleOption => isObject(value);
    const message: TMessage = isOption(option) ? option.message : option;
    const errMessage: TMessage = message + TEXT.HTTP_ERROR_SUFFIX;
    const successMessage: TMessage = message + TEXT.HTTP_SUCCESS_SUFFIX;
    const errCode: HttpStatus = isOption(option) ? option.error : null;
    const successCode: HttpStatus = isOption(option) ? option.success : null;
    const usePaginate: boolean = isOption(option) ? option.usePaginate : null;

    return buildHttpDecorator({ errCode, successCode, errMessage, successMessage, usePaginate });
}

export const paginate = (): MethodDecorator => {
    return buildHttpDecorator({ usePaginate: true });
};

export const HttpProcessor = { error, success, handle, paginate };
