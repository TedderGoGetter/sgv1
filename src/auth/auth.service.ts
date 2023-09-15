import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        //we want to generate the password hash
        const hash = await argon.hash(dto.password);
        //add the user to the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    userName: dto.email
                },
            });
            delete user.hash;
            //return the saved user
            return user;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {  //if it's a prisma error
                if (error.code === 'P2002') {//Prisma's error for duplicates.
                    throw new ForbiddenException('Email taken')
                }
            }
            throw error;
        }



    }

    signin() {
        return { msg: 'You have signed in!'}
    }
}