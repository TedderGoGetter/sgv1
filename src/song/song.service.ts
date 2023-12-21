import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from "@nestjs/config";
import { SongDto } from "./dto";

@Injectable()
export class SongService {

    constructor(
        private prisma: PrismaService,
        private config: ConfigService) {}

        async postSong(dto: SongDto) {

            try {
                const song = await this.prisma.song.create({
                    data: {
                        name: dto.name,
                        authorId: "c8272677-d40c-49f4-a5f9-b054481bd848",
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