import { Body, Controller, ParseIntPipe, Post, Get, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseGuards, Inject } from "@nestjs/common";
import { SongService } from "./song.service";
import { SongDto } from "./dto/song.dto";
import { JwtGuard } from "src/auth/guard";


@Controller('song')
export class SongController {
    constructor (private songService: SongService) {}

    @Get('/')
    getSong () {
        return "Hello"
    }

    @UseGuards(JwtGuard)
    @Post('/')
    postSong(@Body() songData: SongDto) {
        console.log({songData})
        return this.songService.postSong(songData)
    }

    // @Inject(REQUEST) req: Request
}