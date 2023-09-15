import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
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

            return user;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {  //if it's a prisma error
                if (error.code === 'P2002') {//Prisma's error code for duplicates.
                    throw new ForbiddenException('Email taken')
                }
            }
            throw error;
        }



    }

    async signin(dto: AuthDto) {
        //find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        }) 
        // console.log('email')
        //error code for user doesn't exist
        if (!user) throw new ForbiddenException('User not found')

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        //throw wrong password error
        if (!pwMatches) throw new ForbiddenException('Password does not match')

        //send back user if everything ok
        delete user.hash
        return user
    }
}