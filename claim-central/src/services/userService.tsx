import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export const singUp = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const result = response.user;

    return result;
};

export const singIn = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const result = response.user;

    return result;
};

export const isLoggedIn = () => {
    const listener = onAuthStateChanged(auth, (user) => {
        if (user) {
            return user;
        } else {
            return null;
        }
    });

    return listener();
};