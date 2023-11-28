import { firebaseApi } from '../../app/firebaseApi';
import { storage, db, auth } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

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
    })
});

export const { useOpenClaimMutation } = claimApi;