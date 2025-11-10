import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/request/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async register(dto: RegisterDto, role: string): Promise<any> {
        //  Check if user with username exists
        const existingUser = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });

        if (existingUser) {
            throw new ConflictException(
                `User with  this username already exists`,
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        //  Create User
        const { password, ...rest } = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: hashedPassword,
            }
        });
    }
}
