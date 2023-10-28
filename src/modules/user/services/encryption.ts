import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Encryption {
  async encrypt(value: string): Promise<string> {
    const saltOrRounds = 15;
    const hash = await bcrypt.hash(value, saltOrRounds);
    return hash;
  }

  async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);
    return isMatch;
  }
}
