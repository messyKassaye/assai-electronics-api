import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderResponseDto } from './dto/OrderResponseDto';
import { ApiResponseDto } from '../common/dto/response/ApiResponseDto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(dto: CreateOrderDto, userId: string): Promise<ApiResponseDto<OrderResponseDto>>;
    getUserOrders(userId: string): Promise<ApiResponseDto<any[]>>;
}
