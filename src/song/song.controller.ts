import { Body, Controller, ParseIntPipe, Post, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { SongService } from "./song.service";
import { AuthDto } from "../auth/dto";

@Controller('song')
export class SongController {
    constructor (private songService: SongService) {}

    @Get('/')
    getSong () {
        return 'Hello'
    }

    @Post('post')
    postSong(@Body() songData) {
        console.log({songData})
        return songData
    }
    
}