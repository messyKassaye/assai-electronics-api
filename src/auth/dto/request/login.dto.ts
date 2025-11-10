import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'john@gmail.com',
        description: "Email address"
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}