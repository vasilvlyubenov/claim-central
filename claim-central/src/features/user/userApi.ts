import { firebaseApi } from '../../app/firebaseApi';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    User
} from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { UserLogin } from '../../types/UserLogin';
import { UserRegister } from '../../types/UserRegister';


export const userApi = firebaseApi.injectEndpoints({
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
        }),
        userSignUp: builder.mutation({
            async queryFn(input: UserRegister) {
                try {
                    const response = await createUserWithEmailAndPassword(auth, input.email, input.password);
                    const result = response.user;

                    const users = collection(db, 'users');
                    const docRef = await addDoc(users, {
                        authId: result.uid,
                        firm: input.firm,
                        userType: input.userType,
                        address: input.address,
                        deadlines: {
                            d3: input.d3,
                            d4: input.d4,
                            d5: input.d5,
                            d6: input.d6,
                            d7: input.d7,
                            d8: input.d8,
                        }
                    });
                    const docRefId = docRef.id;

                    return { data: { user: result, docId: docRefId } };

                } catch (error) {
                    console.error(error);
                    return { error };
                }
            },
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
        }),
        getUserInfo: builder.query({
            async queryFn(docId: string) {
                try {
                    const docRef = doc(db, 'users', docId);
                    const docSnap = await getDoc(docRef);

                    return {data: docSnap.data()};
                } catch (error) {
                    return {error: error};
                }
            }
        }),
    }),
});

export const { useUserSignInQuery, useUserSignUpMutation, useUserSignOutQuery, useUserUpdatePasswordQuery } = userApi;