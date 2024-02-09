import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "src/auth/dto/user-response.dto";

export class ProjectResponseDto {

    @Expose()
    _id: string;

    @Expose()
    name: string;

    @Expose()
    clientName: string;
    
    @Expose()
    startDate: Date;
    
    @Expose()
    endDate: Date;
    
    @Expose()
    progress: number;
    
    @Expose()
    @Type(() => UserResponseDto)
    developers: UserResponseDto[];

  }