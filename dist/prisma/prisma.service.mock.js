"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPrismaService = void 0;
exports.mockPrismaService = {
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
//# sourceMappingURL=prisma.service.mock.js.map