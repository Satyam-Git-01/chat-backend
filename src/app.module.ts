import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { OpenAIService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ChatGateway, OpenAIService],
})
export class AppModule {}
