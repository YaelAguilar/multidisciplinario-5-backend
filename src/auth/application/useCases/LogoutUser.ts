export class LogoutUser {
  async execute(): Promise<{ success: boolean; message: string }> {
    return { success: true, message: 'Logout successful' };
  }
}
