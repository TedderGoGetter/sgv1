import { Body, Controller, ParseIntPipe, Post, Get, HttpCode, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { SongService } from "./song.service";
import { SongDto } from "./dto/song.dto";

@Controller('song')
export class SongController {
    constructor (private songService: SongService) {}

    @Get('/')
    getSong () {
        return 'Hello'
    } 

    @Post('post')
    postSong(@Body() songData: SongDto) {  
        console.log({songData})
        return songData
    }
}