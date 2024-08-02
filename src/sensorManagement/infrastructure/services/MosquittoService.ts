import mqtt, { MqttClient } from 'mqtt';
import { SensorRepository } from '../../domain/repositories/SensorRepository';
import { Sensor } from '../../domain/entities/Sensor';
import { Server as SocketIOServer } from 'socket.io';
import axios from 'axios';

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

      // Verificar si la distancia es igual o menor a 19 y enviar webhook
      if (sensor.type === 'distancia' && parseFloat(sensor.value) >= 21) {
        await this.sendWebhook('Poca comida, alimentando a su hamster');
      }
    } catch (error) {
      console.error('Error saving sensor data:', error);
    }
  }

  private async sendWebhook(message: string): Promise<void> {
    const webhookUrl = 'https://discord.com/api/webhooks/1268753282411528253/I5bO1LpigWGnnClrDSnhbwmU8z1bFhHszvt6Pr1mH84ZstyRwHuHWv1VB7BIBmJmIk1D';
    try {
      await axios.post(webhookUrl, {
        content: message
      });
      console.log('Mensaje enviado a Discord');
    } catch (error) {
      console.error('Error al enviar mensaje a Discord:', error);
    }
  }
}
