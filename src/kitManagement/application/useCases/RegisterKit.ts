import { KitRepository } from '../../domain/repositories/KitRepository';

export class RegisterKit {
  constructor(
    private kitRepository: KitRepository
  ) {}

  async execute(serialNumber: string, userId: string): Promise<{ success: boolean; message: string }> {
    console.log('RegisterKit execute called');

    // Verificar si el kit ya está registrado
    const existingKit = await this.kitRepository.findBySerialNumber(serialNumber);
    if (!existingKit) {
      console.log('Kit not found');
      return { success: false, message: 'Kit not found' };
    }
    
    if (existingKit.user_id) {
      console.log('Kit already registered');
      return { success: false, message: 'Kit already registered' };
    }

    // Registrar el kit al usuario
    existingKit.user_id = userId;
    await this.kitRepository.save(existingKit);
    console.log('Kit registered');

    return { success: true, message: 'Kit registered successfully' };
  }
}
