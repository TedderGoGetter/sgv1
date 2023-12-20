import { IsNotEmpty, IsString } from "class-validator";

export class SongDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    artist: string;
}