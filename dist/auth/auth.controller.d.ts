import { RegisterDto } from "./dto/request/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/request/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../common/dto/response/ApiResponseDto").ApiResponseDto<import("../user/dto/response/UserDto").UserDto>>;
    login(body: LoginDto): Promise<import("../common/dto/response/ApiResponseDto").ApiResponseDto<import("./dto/response/LoginResponse").LoginResponseDto>>;
}
