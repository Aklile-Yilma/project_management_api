import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";


export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, {message: 'Invalid email!'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}