import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './configs/app.config';
import dbConfig from './configs/db.config';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, dbConfig] }),

    // 数据库
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        synchronize: configService.get('typeOrm.synchronize'), // 同步数据表
        autoLoadEntities: configService.get('typeOrm.autoLoadEntities'), // 自动加载实体
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
