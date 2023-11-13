import { firestoreApi } from '../../app/firebaseApi';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, User } from 'firebase/auth';
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
                } catch (error) {
                    console.error(error);
                    return { error };
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

                } catch (error) {
                    console.error(error);
                    return { error };
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

                    return { data: listener() };
                } catch (error) {
                    console.error(error);
                    return { error };
                }
            },
            providesTags: ['User']
        }),
        userSignOut: builder.query({
            async queryFn() {
                try {
                    const result = await signOut(auth);

                    return { data: result };
                } catch (error) {
                    console.error(error);
                    return { error };
                }
            },
            providesTags: ['User']
        }),
        userUpdatePassword: builder.query({
            async queryFn({ user, password }) {
                try {
                    const result = await updatePassword(user, password);

                    return { data: result };
                } catch (error) {
                    console.error(error);
                    return { error };
                }
            },
            providesTags: ['User']
        }),
    }),
});

export const { useUserSignInQuery, useUserSignUpQuery, useUserIsLoggedInQuery, useUserSignOutQuery, useUserUpdatePasswordQuery } = userApi;