import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';
import { FlightsModule } from './flights/flights.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pass@word1',
    database: 'flightbooking', 
    entities: [],
    autoLoadEntities: true,
    synchronize: true
  }), AdminModule, AuthModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService, AdminService, JwtService],
})
export class AppModule {}
