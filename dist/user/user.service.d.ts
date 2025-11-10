import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/request/register.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    register(dto: RegisterDto, role: string): Promise<any>;
}
