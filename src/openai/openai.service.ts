import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getChatCompletion(message: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: message }],
      });

      return response.choices[0]?.message.content || 'No response from AI';
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return 'Sorry, I couldn’t generate a response';
    }
  }
}
