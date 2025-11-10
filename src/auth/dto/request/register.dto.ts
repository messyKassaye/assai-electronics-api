import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'john',
        description: "username"
    })
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username must be alphanumeric' })
    username: string;

    @ApiProperty({
        example: 'john@gmail.com',
        description: "Email address"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'MESERET#98nur',
        description: "Password"
    })
    @MinLength(8)
    @Matches(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must include at least one number' })
    @Matches(/[\W_]/, { message: 'Password must include at least one special character' })
    password: string;
}
