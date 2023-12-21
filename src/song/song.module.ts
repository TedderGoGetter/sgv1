import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtStrategy } from "../auth/strategy";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [SongController],
    providers: [SongService, JwtStrategy]
})

export class SongModule {}
