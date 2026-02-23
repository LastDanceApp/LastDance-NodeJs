import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WitnessModule } from './witness/witness.module';
import { PromiseModule } from './promise/promise.module';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [AuthModule, UserModule, WitnessModule, PromiseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
