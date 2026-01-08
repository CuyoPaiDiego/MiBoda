import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './service/prisma/prisma.module';
import { PrismaService } from './service/prisma/prisma.service';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/',
  }),
    PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
