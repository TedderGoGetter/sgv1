import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategy";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";

@Module({
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [SongController],
    providers: [SongService, JwtStrategy]
})

export class SongModule {}
