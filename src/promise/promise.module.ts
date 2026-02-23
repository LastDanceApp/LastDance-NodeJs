import { Module } from '@nestjs/common';
import { PromiseController } from './promise.controller';
import { PromiseService } from './promise.service';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromiseController],
  providers: [PromiseService],
  exports: [PromiseService],
})
export class PromiseModule {}
