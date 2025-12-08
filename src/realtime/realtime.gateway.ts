import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface AuthenticatedSocket extends Socket {
  viewingCarId?: string;
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.viewingCarId) {
      this.broadcastCount(client.viewingCarId);
    }
    console.log(`User disconnected: ${client.id}`);
  }

  @SubscribeMessage('view_car')
  async onViewCar(client: AuthenticatedSocket, carId: string) {
  
    await client.join(carId);
    client.viewingCarId = carId;

  
    await this.broadcastCount(carId);
  }

  @SubscribeMessage('leave_car')
  async onLeaveCar(client: AuthenticatedSocket, carId: string) {
    if (client.viewingCarId === carId) {
      await client.leave(carId);
      client.viewingCarId = undefined;

      
      await this.broadcastCount(carId);
    }
  }

  private async broadcastCount(carId: string) {
 
    setTimeout(async () => {
      const sockets = await this.server.in(carId).fetchSockets();
      const count = sockets.length;
      
      const ids = sockets.map((s) => s.id);
      console.log(`[Room ${carId}] Live Connections: [${ids.join(', ')}] | Count: ${count}`);

      this.server.to(carId).emit('car_viewer_count', count);
    }, 150);
  }
}