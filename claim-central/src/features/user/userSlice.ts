import { firestoreApi } from '../../app/firebaseApi';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserLogin } from '../../types/UserLogin';
import { UserRegister } from '../../types/UserRegister';


export const userApi = firestoreApi.injectEndpoints({
    endpoints: (builder) => ({
        userSignIn: builder.query({
            async queryFn(input: UserLogin) {
                try {
                    const response = await signInWithEmailAndPassword(auth, input.email, input.password);
                    const result: User = response.user;

                    return { data: result };
                } catch (error: any) {
                    console.error(error);
                    return error.message;
                }
            },
            providesTags: ['User']
        }),
        userSignUp: builder.query({
            async queryFn(input: UserRegister) {
                try {
                    const response = await createUserWithEmailAndPassword(auth, input.email, input.password);
                    const result = response.user;

                    const users = collection(db, 'users');
                    const docRef = await addDoc(users, { authId: result.uid, firm: input.firm, type: input.type, address: input.address });
                    const docRefId = docRef.id;

                    return { data: result, docId: docRefId };

                } catch (error: any) {
                    console.error(error);
                    return error.message;
                }
            },
            providesTags: ['User']
        }),
        userIsLoggedIn: builder.query({
            async queryFn() {
                try {
                    const listener = onAuthStateChanged(auth, (res) => {
                        if (res) {
                            return { data: res };
                        } else {
                            return { data: null };
                        }
                    });

                    return listener();
                } catch (error: any) {
                    console.error(error.message);
                    return error.message;
                }
            },
            providesTags: ['User']
        }),
        userSignOut: builder.query<void, void>({
            async queryFn() {
                try {
                    const result = await signOut(auth);

                    return { data: result };
                } catch (error: any) {
                    console.error(error.message);
                    return error.message;
                }
            },
            providesTags: ['User']
        }),
    }),
});

export const { useUserSignInQuery, useUserSignUpQuery, useUserIsLoggedInQuery, useUserSignOutQuery } = userApi;