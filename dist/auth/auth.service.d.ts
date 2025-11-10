import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/request/register.dto';
import { UserDto } from 'src/user/dto/response/UserDto';
import { LoginDto } from './dto/request/login.dto';
import { LoginResponseDto } from './dto/response/LoginResponse';
import { ApiResponseDto } from 'src/common/dto/response/ApiResponseDto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<ApiResponseDto<UserDto>>;
    login(dto: LoginDto): Promise<ApiResponseDto<LoginResponseDto>>;
}
