import { Injectable } from '@nestjs/common'
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt', //This gets assigned by default and can be left blank, it's just to know where 'jwt' is coming from
) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,  //false by default but good for testing
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    validate(payload: any) {
        console.log({payload,})

        return payload

    }
}