"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResponseDto = exports.OrderItems = void 0;
class OrderItems {
    productId;
    quantity;
}
exports.OrderItems = OrderItems;
class OrderResponseDto {
    id;
    userId;
    totalAmount;
    status;
    items;
    createdAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.OrderResponseDto = OrderResponseDto;
//# sourceMappingURL=OrderResponseDto.js.map