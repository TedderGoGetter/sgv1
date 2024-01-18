import { Body, Controller, ParseIntPipe, Post, HttpCode, HttpStatus, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';
import { JwtGuard } from "./guard";
import { RtGuard } from "./guard/rt.guard";
import { GetUser, GetUserId } from "./decorator";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signin(dto)
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetUserId() userId: string) {
        return this.authService.logout(userId)

    }

    @UseGuards(RtGuard)
    @Post('refresh') 
    @HttpCode(HttpStatus.OK) 
    refreshToken(@GetUserId() userId: string, @GetUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userId, refreshToken)
    }
}