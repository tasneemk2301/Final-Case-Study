import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AdminService, JwtService],
})
export class AppModule {}
