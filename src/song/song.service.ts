import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "../auth/dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SongService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

        
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

            return this.signToken(user.id, user.email)

        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {  //if it's a prisma error
                if (error.code === 'P2002') {//Prisma's error code for duplicates.
                    throw new ForbiddenException('Email taken')
                }
            }
            throw error;
        }
    }
    
    async signToken(
        userId: string, 
        email: string
    ): Promise<{access_token: string}> { 
        const payload = {  
            sub: userId, 
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '20m',
            secret: secret
        })  

        return {
            access_token: token,
        }
    }
}