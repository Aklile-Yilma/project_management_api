// project-update.dto.ts
import { IsOptional, IsDate, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class ProjectUpdateDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly clientName?: string;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;

    @IsOptional()
    @IsDate()
    readonly endDate?: Date;

    @IsOptional()
    @IsNumber()
    readonly progress?: number;

}
