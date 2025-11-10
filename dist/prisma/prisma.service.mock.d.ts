export declare const mockPrismaService: {
    order: {
        create: jest.Mock<any, any, any>;
        findMany: jest.Mock<any, any, any>;
    };
    product: {
        create: jest.Mock<any, any, any>;
        findUnique: jest.Mock<any, any, any>;
        update: jest.Mock<any, any, any>;
        delete: jest.Mock<any, any, any>;
    };
    $transaction: jest.Mock<any, any, any>;
};
