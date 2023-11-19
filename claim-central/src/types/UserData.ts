import { TDeadlines } from './TDeadlines';

export type UserData = {
    email: string;
    password: string;
    firm: string;
    userType: string;
    address: string;
    deadlines: TDeadlines
}