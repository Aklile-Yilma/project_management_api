import { Expose, Transform, Type } from "class-transformer";
import { ObjectId } from "mongoose";
import { UserResponseDto } from "src/auth/dto/user-response.dto";

export class ProjectResponseDto {

    // @Expose()
    // _id: string;

    @Expose()
    @Transform((value) => value.obj._id.toString())
    _id: ObjectId; 

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