import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InstModule } from './inst/inst.module';

@Module({
  imports: [AuthModule, UserModule, InstModule],
})
export class AppModule {}
