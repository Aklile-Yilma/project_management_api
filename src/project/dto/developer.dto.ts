import { IsNotEmpty, IsString } from "class-validator";


export class DeveloperDto {

    @IsNotEmpty()
    @IsString()
    readonly developerId: string;
}