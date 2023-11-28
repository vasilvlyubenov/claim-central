import { firebaseApi } from '../../app/firebaseApi';
import { storage, db, auth } from '../../config/firebase';
import { DocumentData, addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { OpenClaimSubmit } from '../../types/OpenClaimSubmit';
import { ref, uploadBytes } from 'firebase/storage';
import { generateFileName } from '../../utils/helpers';


export const claimApi = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        openClaim: builder.mutation({
            async queryFn(data: OpenClaimSubmit) {
                try {
                    let filePath = '';

                    if (data.file !== null) {
                        const fileName = generateFileName(data.file[0].name);
                        const claimsFileRef = ref(storage, `open-claims/${fileName}`);

                        const upload = await uploadBytes(claimsFileRef, data.file[0]);
                        filePath = upload.metadata.fullPath;
                    }

                    const date = new Date();

                    const docData = {
                        subject: data.subject,
                        issueDescription: data.issueDescription,
                        supplierId: data.supplierId,
                        open: true,
                        customerId: auth.currentUser?.uid,
                        dateOpen: date,
                        dateClosed: '',
                        filePath
                    };

                    const docRef = await addDoc(collection(db, 'claims'), docData);

                    return { data: docRef.id };

                } catch (error) {
                    console.error(error);
                    return { error };
                }
            }
        }),
        supplierClaims: builder.query({
            async queryFn() {
                try {
                    const supplierId = auth.currentUser?.uid;

                    const q = query(collection(db, 'claims'), where('supplierId', '==', supplierId));
                    const querrySnapshot = await getDocs(q);
                    const claims: DocumentData[] = [];
                    
                    querrySnapshot.forEach(doc => {
                        const line = doc.data();
                        
                        const converted = {...line, dateOpen: (new Date(line.dateOpen.seconds * 1000 + line.dateOpen.nanoseconds / 1000000)).toDateString()};
                        claims.push(converted);
                    });
                    
                    const customerQ = query(collection(db, 'users'), where('userType', '==', 'customer'));
                    const customerSnapShot = await getDocs(customerQ);

                    const customers: DocumentData[] = [];

                    customerSnapShot.forEach(cust => {
                        const customer = cust.data();
                        customers.push(customer);
                    });

                    return { data: {claims, customers} };
                } catch (error) {
                    return { error };
                }
            }
        }),
    })
});

export const { useOpenClaimMutation, useSupplierClaimsQuery } = claimApi;