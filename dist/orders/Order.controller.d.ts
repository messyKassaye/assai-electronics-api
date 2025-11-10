import { CreateOrderDto } from "./dto/createOrderDto";
import { ApiResponseDto } from "src/common/dto/response/ApiResponseDto";
import { OrderResponseDto } from "./dto/OrderResponseDto";
import { OrdersService } from "./Orders.service";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getMyOrders(req: any): Promise<ApiResponseDto<any[]>>;
    create(dto: CreateOrderDto, req: any): Promise<ApiResponseDto<OrderResponseDto>>;
}
