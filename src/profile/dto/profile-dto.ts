import { IsOptional, IsString } from "class-validator";


export class ProfileDto {

    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly contactInfo?: string;
    
}