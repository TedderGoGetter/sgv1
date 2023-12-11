import { Body, Controller, ParseIntPipe, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { AuthDto } from "../auth/dto";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
    
}