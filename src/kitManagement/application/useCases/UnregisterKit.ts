import { KitRepository } from '../../domain/repositories/KitRepository';

export class UnregisterKit {
  constructor(
    private kitRepository: KitRepository
  ) {}

  async execute(serialNumber: string, userId: string): Promise<{ success: boolean; message: string }> {
    console.log('UnregisterKit execute called');

    // Verificar si el kit está registrado por el usuario
    const existingKit = await this.kitRepository.findBySerialNumber(serialNumber);
    if (!existingKit) {
      console.log('Kit not found');
      return { success: false, message: 'Kit not found' };
    }
    
    if (existingKit.user_id !== userId) {
      console.log('Kit not registered by this user');
      return { success: false, message: 'Kit not registered by this user' };
    }

    // Desvincular el kit del usuario
    existingKit.user_id = null;
    await this.kitRepository.save(existingKit);
    console.log('Kit unregistered');

    return { success: true, message: 'Kit unregistered successfully' };
  }
}
