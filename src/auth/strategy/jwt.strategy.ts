import { Injectable } from '@nestjs/common'
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt', //This gets assigned by default and can be left blank, it's just to know where 'jwt' is coming from
) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {id: string, email: string}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        delete user.hash
        
        return user //if payload is null then the GET route returns an error. This is how we validate the user.
    } 
}