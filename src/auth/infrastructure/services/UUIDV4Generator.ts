import { UUIDGenerator } from '../../domain/services/UUIDGenerator';
import { v4 as uuidv4 } from 'uuid';

export class UUIDV4Generator implements UUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
