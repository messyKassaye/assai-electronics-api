import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorators";
import { JwtAuthGuard } from "src/auth/guards/jwtauth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateOrderDto } from "./dto/createOrderDto";
import { ApiResponseDto } from "src/common/dto/response/ApiResponseDto";
import { OrderResponseDto } from "./dto/OrderResponseDto";
import { OrdersService } from "./Orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async getMyOrders(@Request() req) {
        return await this.ordersService.getUserOrders(req.user.userId);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    async create(
        @Body() dto: CreateOrderDto,
        @Request() req,
    ): Promise<ApiResponseDto<OrderResponseDto>> {
        return await this.ordersService.createOrder(dto, req.user.userId);
    }
}