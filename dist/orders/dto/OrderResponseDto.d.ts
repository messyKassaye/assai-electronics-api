export declare class OrderItems {
    productId: string;
    quantity: number;
}
export declare class OrderResponseDto {
    id: string;
    userId: string;
    totalAmount: number;
    status: string;
    items: OrderItems[];
    createdAt: Date;
    constructor(partial: Partial<OrderResponseDto>);
}
