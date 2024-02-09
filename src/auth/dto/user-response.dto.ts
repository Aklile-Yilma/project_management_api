import { Expose } from "class-transformer";


export class UserResponseDto {

    @Expose()
    name: string;
    
    @Expose()
    role: string;
    
    @Expose()
    contactInfo: string;
    
    @Expose()
    email: string;
}