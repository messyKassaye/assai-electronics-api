export declare class ResponseDto<T> {
    success: boolean;
    message: string;
    object: T | null;
    errors: string[] | null;
    constructor(success: boolean, message: string, object?: T | null, errors?: string[] | null);
}
