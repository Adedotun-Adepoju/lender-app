import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ClientsService } from './clients/clients.service';

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
  providers: [AppService, ClientsService],
})
export class AppModule {}
