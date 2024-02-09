import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProjectDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly clientName: string;

    @IsDate()
    readonly startDate: Date;

    @IsDate()
    readonly endDate: Date;

    @IsNumber()
    readonly progress: number;

}