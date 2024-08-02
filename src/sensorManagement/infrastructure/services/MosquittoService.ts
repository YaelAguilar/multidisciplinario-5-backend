import mqtt, { MqttClient } from 'mqtt';
import { SensorRepository } from '../../domain/repositories/SensorRepository';
import { Sensor } from '../../domain/entities/Sensor';
import { Server as SocketIOServer } from 'socket.io';

export class MosquittoService {
  private client: MqttClient;

  constructor(private sensorRepository: SensorRepository, private io: SocketIOServer) {
    this.client = mqtt.connect('mqtt://broker.emqx.io:1883');
    this.client.on('connect', () => {
      console.log('Connected to Mosquitto');
      this.client.subscribe('entrada/1', (err: Error | null) => {
        if (err) {
          console.error('Subscription error:', err);
        } else {
          console.log('Subscribed to entrada/1 topic');
        }
      });
    });

    this.client.on('message', (topic: string, message: Buffer) => {
      console.log(`Received data from topic ${topic}:`, message.toString());
      this.handleMessage(topic, message);
    });
  }

  private async handleMessage(topic: string, message: Buffer): Promise<void> {
    const data = JSON.parse(message.toString());

    const sensor = new Sensor(
      data.id,
      data.type,
      data.value,
      data.unit,
      data.kitId
    );

    try {
      await this.sensorRepository.save(sensor);
      console.log('Sensor data saved successfully');

      // Emitir datos a través de Socket.IO
      this.io.emit('sensor-data', sensor);
    } catch (error) {
      console.error('Error saving sensor data:', error);
    }
  }
}
