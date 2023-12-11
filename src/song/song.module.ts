import { Module } from "@nestjs/common";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategy";

@Module({
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})

export class AuthModule {}
