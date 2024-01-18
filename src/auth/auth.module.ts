import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, RtStrategy } from "./strategy";

@Module({
    imports: [PrismaModule, JwtModule.register({
        secret: process.env["JWT_SECRET"],
        global: true,
        signOptions: {
            expiresIn: '24h',
        }
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RtStrategy]
})

export class AuthModule {}