import { Module } from '@nestjs/common';
import { WitnessController } from './witness.controller';
import { WitnessService } from './witness.service';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WitnessController],
  providers: [WitnessService],
  exports: [WitnessService],
})
export class WitnessModule {}
