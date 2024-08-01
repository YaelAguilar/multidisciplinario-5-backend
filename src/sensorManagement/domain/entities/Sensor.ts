export class Sensor {
  constructor(
    public id: string,
    public type: string,
    public value: string,
    public unit: string,
    public kitId: string
  ) {}
}
