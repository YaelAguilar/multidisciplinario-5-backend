import { Sensor } from '../../../sensorManagement/domain/entities/Sensor';

export class Kit {
  constructor(
    public serial_number: string,
    public user_id: string | null,
    public sensors?: Sensor[]
  ) {}
}
