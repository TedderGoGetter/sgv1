import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InstModule } from './inst/inst.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';

@Module({
  imports: [AuthModule, UserModule, InstModule,SongModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
