import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";
import { UserRole } from "../schemas/user.schema";
import { IsEnum } from "class-validator";


export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Invalid role. Must be one of: Client, Admin, Developer' })
    readonly role: UserRole;

    @IsNotEmpty()
    @IsString()
    readonly contactInfo: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Invalid email!'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
    
}