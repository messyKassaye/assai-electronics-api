export const mockPrismaService = {
    order: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
    product: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
    $transaction: jest.fn(),
};