//13.3.2
import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string;
  readonly phone: string;
}
