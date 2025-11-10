import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderItems, OrderResponseDto } from './dto/OrderResponseDto';
import { ApiResponseDto } from '../common/dto/response/ApiResponseDto';


@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async createOrder(
        dto: CreateOrderDto,
        userId: string
    ): Promise<ApiResponseDto<OrderResponseDto>> {
        return this.prisma.$transaction(async (tx) => {
            let totalPrice = 0;
            const orderItemsData: OrderItems[] = [];

            for (const item of dto.items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (!product) throw new NotFoundException(`Product not found: ${item.productId}`);

                if (product.stock < item.quantity)
                    throw new BadRequestException(`Insufficient stock for product: ${product.name}`);

                totalPrice += product.price * item.quantity;

                orderItemsData.push({
                    productId: product.id,
                    quantity: item.quantity,
                });

                await tx.product.update({
                    where: { id: product.id },
                    data: { stock: product.stock - item.quantity },
                });
            }

            const order = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                    description: dto.description || 'No description',
                    status: 'pending',
                    orderItems: {
                        create: orderItemsData.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    orderItems: true,
                },
            });

            return new ApiResponseDto<OrderResponseDto>(
                true,
                'Order placed successfully',
                new OrderResponseDto({
                    id: order.id,
                    userId: order.userId,
                    totalAmount: order.totalPrice,
                    status: order.status,
                    items: order.orderItems.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                    createdAt: order.createdAt,
                })
            );
        });
    }


    async getUserOrders(userId: string): Promise<ApiResponseDto<any[]>> {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                status: true,
                totalPrice: true,
                createdAt: true,
                orderItems: {
                    select: {
                        productId: true,
                        quantity: true,
                    },
                },
            },
        });

        return new ApiResponseDto<any[]>(
            true,
            'Orders retrieved successfully',
            orders,
        );
    }

}
