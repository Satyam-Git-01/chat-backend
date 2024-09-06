import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OpenAIService } from '../openai/openai.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins, adjust for production
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private openAIService: OpenAIService) {}

  //on connection code
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  //on disconnect code
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  //got message from client here
  @SubscribeMessage('messageFromClient')
  async handleMessage(@MessageBody() message: string): Promise<void> {
    console.log('Received message from client:', message);
    
    //Calling open ai service method
    const aiResponse = await this.openAIService.getChatCompletion(message);
    this.server.emit('messageFromServer', aiResponse);
  }
}
