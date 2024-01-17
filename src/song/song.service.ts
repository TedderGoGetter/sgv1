import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from "@nestjs/config";
import { SongDto } from "./dto";
import { GetUser } from "src/auth/decorator";

@Injectable()
export class SongService {

    constructor(
        private prisma: PrismaService,
        private config: ConfigService) {}

        async postSong(dto: SongDto, authorId) {

            try {
                const song = await this.prisma.song.create({
                    data: {
                        name: dto.name,
                        authorId: authorId,
                    },
                });
    
            } catch(error) {
                if (error instanceof PrismaClientKnownRequestError) {  //if it's a prisma error
                    console.log({error: error.code})
                } 
                throw error;
            }

            return {msg: "song posted!"}
        }


        
                //this is with jwt and stuff. Use for reference.

    
    // async signToken(
    //     userId: string, 
    //     email: string
    // ): Promise<{access_token: string}> { 
    //     const payload = {  
    //         sub: userId, 
    //         email
    //     }
    //     const secret = this.config.get('JWT_SECRET')

    //     const token = await this.jwt.signAsync(payload, {
    //         expiresIn: '20m',
    //         secret: secret
    //     })  

    //     return {
    //         access_token: token,
    //     }
    // }
}