import { firebaseApi } from '../../app/firebaseApi';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
    User
} from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { collection, doc, DocumentData, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { UserLogin } from '../../types/UserLogin';
import { RegisterFormData } from '../../types/RegisterFormData';
import { UserData } from '../../types/UserData';


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
            async queryFn(input: RegisterFormData) {
                try {
                    const response = await createUserWithEmailAndPassword(auth, input.email, input.password);
                    const result = response.user;

                    await updateProfile(result, { displayName: input.userType });

                    const users = doc(db, 'users', result.uid);
                    await setDoc(users, {
                        email: input.email,
                        userId: result.uid,
                        firm: input.firm,
                        userType: input.userType,
                        address: input.address,
                        deadlines: {
                            d3: input.deadlines.d3,
                            d4: input.deadlines.d4,
                            d5: input.deadlines.d5,
                            d6: input.deadlines.d6,
                            d7: input.deadlines.d7,
                            d8: input.deadlines.d8,
                        }
                    });

                    return { data: { user: result } };

                } catch (error) {
                    console.error(error);
                    return { error };
                }
            },
        }),
        userSignOut: builder.query({
            async queryFn() {
                try {
                    await signOut(auth);

                    return { data: 'Success' };
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
            async queryFn() {
                try {
                    const user = auth.currentUser;

                    if (user) {
                        const docRef = doc(db, 'users', user.uid);
                        const docSnap = await getDoc(docRef);
                        return { data: docSnap.data() };
                    }

                    return { data: {} };
                } catch (error) {
                    console.error(error);
                    return { error: error };
                }
            }
        }),
        getAllSuppliers: builder.query({
            async queryFn() {
                try {

                    const docRef = collection(db, 'users');
                    const q = query(docRef, where('userType', '==', 'supplier'));
                    const docSnap = await getDocs(q);

                    const data: DocumentData[] = [];

                    docSnap?.forEach(doc => {
                        const d = doc.data();
                        data.push(d);
                    });

                    return { data: data };
                } catch (error) {
                    console.error(error);
                    return { error: error };
                }
            }
        }),
        updatePasword: builder.mutation({
            async queryFn(password: string) {
                try {
                    const user = auth.currentUser;
                    if (user) {
                        await updatePassword(user, password);
                    }

                    return { data: 'Password updated successfully.' };
                } catch (error) {
                    console.error(error);
                    return { error };
                }
            }
        }),
        UpdateUserData: builder.mutation({
            async queryFn(data: UserData) {
                try {
                    const user = auth.currentUser;

                    if (user) {
                        const userRef = doc(db, 'users', user?.uid);
                        await updateDoc(userRef, data);
                        await updateProfile(user, {displayName: data.userType});
                    }

                    return { data: 'Success' };
                } catch (error) {
                    return { error };
                }
            }
        }),
    }),
});

export const {
    useUserSignInQuery,
    useUserSignUpMutation,
    useUserSignOutQuery,
    useUserUpdatePasswordQuery,
    useGetUserInfoQuery,
    useGetAllSuppliersQuery,
    useUpdatePaswordMutation,
    useUpdateUserDataMutation,
} = userApi;