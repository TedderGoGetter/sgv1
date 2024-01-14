import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class SongDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    artist: string;
}