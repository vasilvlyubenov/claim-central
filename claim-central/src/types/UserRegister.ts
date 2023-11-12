export type UserRegister = {
    email: string;
    password: string;
    firm: string;
    type: 'Customer' | 'Supplier';
    address: string;
}