import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";
import { Tokens } from "./types";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

        
        async signup(dto: AuthDto): Promise<Tokens> {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    userName: dto.email
                },
            });
            
            const tokens = this.signToken(user.id, user.email)
            await this.storeRt(user.id, (await tokens).refresh_token)
            return tokens

        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) { 
                if (error.code === 'P2002') {//Prisma's error code for duplicates.
                    throw new ForbiddenException('Email taken')
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto): Promise<Tokens> {

        const user = await this.prisma.user.findUnique({ 
            where: {
                email: dto.email,
            },
        }) 
        if (!user) throw new ForbiddenException('User not found')

        const pwMatches = await argon.verify(user.hash, dto.password)
        if (!pwMatches) throw new ForbiddenException('Password does not match')

        const tokens = this.signToken(user.id, user.email)
        await this.storeRt(user.id, (await tokens).refresh_token)
        console.log("logged in ", dto.email)
        return tokens
    }

    async logout(userId: string) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            }
        })
    }

    async refreshToken(userId: string, rt: string){
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user || !user.hashedRt) throw new ForbiddenException("Access denied")

        const rtMatches = await argon.verify(user.hashedRt, rt)
        if (!rtMatches) throw new ForbiddenException("Access denied")

        const tokens = this.signToken(user.id, user.email)
        await this.storeRt(user.id, (await tokens).refresh_token)
        return tokens
    }

    async signToken(userId: string, email: string): Promise<Tokens> { 
        const [at, rt] = await Promise.all([
    
            this.jwt.signAsync({
                sub: userId,
                email, 
            },
            {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: 60 * 20,
            }
            ),

    
            this.jwt.signAsync({
                sub: userId,
                email, 
            },
            {
                secret: this.config.get('RT_SECRET'),
                expiresIn: 60 * 60 * 24 * 7,
            })  
        ])

        
        return {
            access_token: at,
            refresh_token: rt,
        }
    }

    async storeRt(userId: string, rt: string) {
        const hash = await argon.hash(rt)
        await this.prisma.user.update({
            where: {
                id: userId,
            }, 
            data: {
                hashedRt: hash,
            }
        })
    }

    // async signToken(
    //     userId: string, 
    //     email: string
    // ): Promise<{access_token: string}> { 
    //     const payload = {  
    //         sub: userId, 
    //         email
    //     }

    //     const token = await this.jwt.signAsync(payload)  

    //     return {
    //         access_token: token,
    //     }
    // }
}