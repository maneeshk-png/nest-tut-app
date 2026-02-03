import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, // optional: makes config available in the entire app
    }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
