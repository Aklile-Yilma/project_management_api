import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProjectDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly clientName: string;

    @IsDateString()
    readonly startDate: Date;

    @IsDateString()
    readonly endDate: Date;

    @IsNumber()
    readonly progress: number;

}