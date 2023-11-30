import { TDeadlines } from './TDeadlines';

export type RegisterFormData = {
    email: string;
    password: string;
    repeatPassword: string;
    firm: string;
    userType: '' | 'customer' | 'supplier';
    address: string;
    deadlines: TDeadlines
  }