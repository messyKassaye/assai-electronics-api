export class OrderItems {
    productId: string;
    quantity: number;
}
export class OrderResponseDto {
    id: string;
    userId: string;
    totalAmount: number;
    status: string;
    items: OrderItems[];
    createdAt: Date;

    constructor(partial: Partial<OrderResponseDto>) {
        Object.assign(this, partial);
    }
}
