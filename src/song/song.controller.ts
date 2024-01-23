import { Body, Controller, ParseIntPipe, Post, Get, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseGuards, Inject } from "@nestjs/common";
import { SongService } from "./song.service";
import { SongDto } from "./dto/song.dto";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";


@Controller('song')
export class SongController {
    constructor (private songService: SongService) {}

    @UseGuards(JwtGuard)
    @Get('/')
    getSong () {
        return this.songService.getSongs()
    }

    @UseGuards(JwtGuard)
    @Post('/')
    postSong(@Body() songData: SongDto, @GetUser('sub') authorId: string) {
        console.log({songData})
        console.log({authorId})
        return this.songService.postSong(songData, authorId)
    }

}