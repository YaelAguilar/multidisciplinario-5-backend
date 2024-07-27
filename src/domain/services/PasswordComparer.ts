export interface PasswordComparer {
    compare(password: string, hashedPassword: string): Promise<boolean>;
  }
  