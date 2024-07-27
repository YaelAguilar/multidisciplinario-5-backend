export class Kit {
    constructor(
        public serial_number: string,
        public user_id: string | null,
        public humidity_sensor_id: string,
        public light_sensor_id: string,
        public food_sensor_id: string
    ){}
  }
  