import { ServicesModule } from './modules/services/services.module';
import { ServiceType } from './modules/service-types/entities/service-type.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './modules/roles/entities/role.entity';
import { RolesModule } from './modules/roles/roles.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServiceTypesModule } from './modules/service-types/service-types.module';
import { Service } from './modules/services/entities/service.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Role, ServiceType, Service],

      synchronize: true,
      logging: false,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ServiceTypesModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
