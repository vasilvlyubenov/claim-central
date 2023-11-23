import { firebaseApi } from 'app/firebaseApi';
import { auth, storage, db } from '../../config/firebase';
import { collection, doc, DocumentData, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

import { OpenClaim } from '../../types/OpenClaim';


export const claimApi = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        openClaim: builder.mutation({
            async queryFn(data: OpenClaim) {
                
            }
        }),
    })
});