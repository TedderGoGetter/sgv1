import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        //we want to generate the password hash
        const hash = await argon.hash(dto.password);
        //add the user to the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                userName: dto.email //data couldn't exist without userName for some reason. Until I fix it I'll set userName to the email.
            },
        })
        //return the saved user
        return user;
    }

    signin() {
        return { msg: 'You have signed in!'}
    }
}