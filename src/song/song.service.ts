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

        async getSongs() {
            return this.prisma.song.findMany({})
        }

        async postSong(dto: SongDto, authorId) {

            //trying to see if artists are known, and creating one if need be.
            let knownArtist = await this.prisma.artist.findFirst({
                where: {
                    name : dto.artist
                }
            })
            if (!knownArtist) {

                try {
                    knownArtist = await this.prisma.artist.create({
                        data: {
                            name: dto.artist
                        },
    
                    })
                } catch (error) {
                    if (error instanceof PrismaClientKnownRequestError) { 
                        console.log({error: error.code})
                    } 
                    throw error;
                }
            }

            

            try {
                const song = await this.prisma.song.create({
                    data: {
                        name: dto.name,
                        authorId: authorId,
                        artist: {
                            connect: {
                                id: knownArtist.id
                            }
                        }
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

}