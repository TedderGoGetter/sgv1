import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser('') user: User) {
        return user  //you could change this to just the userId or whatever you'd like to get.
    }

}
