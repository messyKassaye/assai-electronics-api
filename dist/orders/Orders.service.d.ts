import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { ApiResponseDto } from 'src/common/dto/response/ApiResponseDto';
import { OrderResponseDto } from './dto/OrderResponseDto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(dto: CreateOrderDto, userId: string): Promise<ApiResponseDto<OrderResponseDto>>;
    getUserOrders(userId: string): Promise<ApiResponseDto<any[]>>;
}
