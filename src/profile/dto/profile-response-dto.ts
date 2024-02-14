import { Expose } from "class-transformer";


export class profileResponseDto {

    @Expose()
    name: string;
    
    @Expose()
    role: string;
    
    @Expose()
    contactInfo: string;
    
    @Expose()
    email: string;
}