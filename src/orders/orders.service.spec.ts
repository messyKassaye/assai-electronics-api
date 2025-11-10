import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.service.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersService } from './Orders.service'
import { CreateOrderDto } from './dto/createOrderDto';

describe('OrdersService', () => {
    let service: OrdersService;
    let prisma: typeof mockPrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        prisma = module.get<PrismaService>(PrismaService) as any;

        jest.clearAllMocks();
    });

    describe('createOrder', () => {
        it('should create an order successfully', async () => {
            const dto: CreateOrderDto = {
                items: [{ productId: 'prod-1', quantity: 2 },], description: 'Prod description'
            };

            const mockProduct = { id: 'prod-1', name: 'Test Product', stock: 10, price: 50 };
            prisma.product.findUnique.mockResolvedValue(mockProduct);
            prisma.product.update.mockResolvedValue({ ...mockProduct, stock: 8 });
            prisma.$transaction.mockImplementation((fn) => fn(prisma));

            prisma.order.create.mockResolvedValue({
                id: 'order-1',
                userId: 'user-1',
                totalAmount: 100,
                orderItems: [{ productId: 'prod-1', quantity: 2, price: 50 }],
                createdAt: new Date(),
            });

            const result = await service.createOrder(dto, 'user-1');

            expect(result.success).toBe(true);
            expect(result.object!.id).toBe('order-1');
            expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.product.update).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException if product does not exist', async () => {
            prisma.product.findUnique.mockResolvedValue(null);

            await expect(
                service.createOrder({ items: [{ productId: 'prod-99', quantity: 1 }], description: 'Prod description' }, 'user-1'),
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException if stock is insufficient', async () => {
            prisma.product.findUnique.mockResolvedValue({ id: 'prod-1', name: 'Test', stock: 1, price: 50 });

            await expect(
                service.createOrder({ items: [{ productId: 'prod-1', quantity: 2 }], description: 'Prod description' }, 'user-1'),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('getUserOrders', () => {
        it('should return user orders', async () => {
            const mockOrders = [
                {
                    id: 'order-1',
                    userId: 'user-1',
                    totalAmount: 100,
                    status: 'pending',
                    createdAt: new Date(),
                    orderItems: [{ productId: 'prod-1', quantity: 2, price: 50 }],
                },
            ];

            prisma.order.findMany.mockResolvedValue(mockOrders);

            const result = await service.getUserOrders('user-1');

            expect(result.success).toBe(true);
            expect(result.object!.length).toBe(1);
            expect(prisma.order.findMany).toHaveBeenCalledWith(
                expect.objectContaining({ where: { userId: 'user-1' } }),
            );
        });
    });
});
