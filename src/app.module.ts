import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InstModule } from './inst/inst.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule, InstModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
