import { firebaseApi } from '../../app/firebaseApi';
import { storage, db, auth } from '../../config/firebase';
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { OpenClaimSubmit } from '../../types/OpenClaimSubmit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { calculateDeadline, generateFileName } from '../../utils/helpers';


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
                        filePath,
                        deadlines: {
                            d3: calculateDeadline(Number(data.deadlines.d3), 1),
                            d4: calculateDeadline(Number(data.deadlines.d4)),
                            d5: calculateDeadline(Number(data.deadlines.d5)),
                            d6: calculateDeadline(Number(data.deadlines.d6)),
                            d7: calculateDeadline(Number(data.deadlines.d7)),
                            d8: calculateDeadline(Number(data.deadlines.d8)),
                        }
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
                    const customerQ = query(collection(db, 'users'), where('userType', '==', 'customer'));
                    const customerSnapShot = await getDocs(customerQ);

                    const customers: DocumentData = {};

                    customerSnapShot.forEach(cust => {
                        const customer = cust.data();

                        if (!Object.prototype.hasOwnProperty.call(customers, customer.userId)) {
                            customers[customer.userId] = customer.email;
                        }
                    });

                    const supplierId = auth.currentUser?.uid;

                    const q = query(collection(db, 'claims'), where('supplierId', '==', supplierId));
                    const querrySnapshot = await getDocs(q);
                    const claims: DocumentData[] = [];

                    querrySnapshot.forEach(doc => {
                        const line = doc.data();

                        const converted = {
                            ...line,
                            dateOpen: (new Date(line.dateOpen.seconds * 1000 + line.dateOpen.nanoseconds / 1000000)).toDateString(),
                            id: doc.id,
                            customerEmail: customers[line.customerId]
                        };
                        claims.push(converted);
                    });

                    return { data: claims };
                } catch (error) {
                    return { error };
                }
            }
        }),
        getClaimById: builder.query({
            async queryFn(claimId: string | undefined) {

                if (!claimId) {
                    throw Error('Something went wrong');
                }

                try {

                    const docRef = doc(db, 'claims', claimId);
                    const docSnap = await getDoc(docRef);
                    const data = docSnap.data();

                    return {data: {claim: data, download: getDownloadURL(ref(storage, data?.filePath))}};
                } catch (error) {
                    return { error };
                }
            }
        }),
    })
});

export const { useOpenClaimMutation, useSupplierClaimsQuery, useGetClaimByIdQuery } = claimApi;