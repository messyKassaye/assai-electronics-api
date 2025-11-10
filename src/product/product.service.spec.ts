import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './Product.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mockPrismaService } from '../prisma/prisma.service.mock';

describe('ProductsService', () => {
    let service: ProductsService;
    let prisma: typeof mockPrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        prisma = module.get<PrismaService>(PrismaService) as any;

        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            const dto = {
                name: 'Test Product',
                description: 'Valid description',
                price: 100,
                stock: 10,
                category: 'Electronics',
            };
            const userId = 'user-1';
            const mockProduct = { id: 'prod-1', ...dto, userId };

            prisma.product.create.mockResolvedValue(mockProduct);

            const result = await service.createProduct(dto, userId);

            expect(result.success).toBe(true);
            expect(result.object!.id).toBe('prod-1');
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: { ...dto, userId },
            });
        });

        it('should throw BadRequestException if validation fails', async () => {
            const invalidDto = {
                name: '',
                description: '',
                price: -10,
                stock: -5,
                category: '',
            };

            await expect(service.createProduct(invalidDto, 'user-1')).rejects.toThrow(
                BadRequestException,
            );
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            const dto = { name: 'Updated Product', price: 120, stock: 15, description: 'Updated description' };
            const productId = 'prod-1';
            const existingProduct = { id: productId, name: 'Old Product', price: 100, stock: 10, description: 'Old desc', category: 'Electronics', userId: 'user-1' };

            prisma.product.findUnique.mockResolvedValue(existingProduct);
            prisma.product.update.mockResolvedValue({ ...existingProduct, ...dto });

            const result = await service.updateProduct(productId, dto);

            expect(result.success).toBe(true);
            expect(result.object!.name).toBe('Updated Product');
            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: productId },
                data: dto,
            });
        });

        it('should throw NotFoundException if product does not exist', async () => {
            prisma.product.findUnique.mockResolvedValue(null);
            await expect(
                service.updateProduct('nonexistent-id', { name: 'Test', price: 10, stock: 1, description: 'desc' }),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            const productId = 'prod-1';
            const mockProduct = { id: productId, name: 'Test Product' };

            prisma.product.findUnique.mockResolvedValue(mockProduct);
            prisma.product.delete.mockResolvedValue(mockProduct);

            const result = await service.deleteProduct(productId);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Product deleted successfully');
            expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: productId } });
        });

        it('should throw NotFoundException if product does not exist', async () => {
            prisma.product.findUnique.mockResolvedValue(null);
            await expect(service.deleteProduct('nonexistent-id')).rejects.toThrow(NotFoundException);
        });
    });
});
