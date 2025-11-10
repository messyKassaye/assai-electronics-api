import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersController } from './Order.controller';
import { OrdersService } from './Orders.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [],
})
export class OrdersModule { }
