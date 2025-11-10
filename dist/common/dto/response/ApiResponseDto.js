"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseDto = void 0;
class ApiResponseDto {
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
exports.ApiResponseDto = ApiResponseDto;
//# sourceMappingURL=ApiResponseDto.js.map