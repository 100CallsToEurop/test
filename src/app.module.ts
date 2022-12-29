import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeorm.config';
import { UsersModule } from './modules/users/users.module';





@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
