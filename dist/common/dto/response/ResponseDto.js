"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    success;
    message;
    object;
    errors;
    constructor(success, message, object = null, errors = null) {
        this.success = success;
        this.message = message;
        this.object = object;
        this.errors = errors;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=ResponseDto.js.map