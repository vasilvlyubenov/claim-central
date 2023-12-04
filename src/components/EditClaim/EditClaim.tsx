import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

import './EditClaim.css';

import { useEditClaimMutation, useGetClaimByIdQuery } from '../../features/claim/claimApi';
import Spinner from 'components/common/Spinner/Spinner';
import { TEditClaim } from '../../types/TEditClaim';


const initialState: TEditClaim = {
    claimId: '',
    subject: '',
    issueDescription: '',
    file: null,
    filePath: ''
};

export default function EditClaim() {
    const [err, setError] = useState('');
    const navigate = useNavigate();
    const { claimId } = useParams();
    const {data, isLoading, error, isSuccess, refetch } = useGetClaimByIdQuery(claimId);
    const [editClaim, {isSuccess: isEditSuccess, isLoading: isEditLoading}] = useEditClaimMutation();

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (!claimId) {
            throw Error('Something went wrong.');
        }

        setFormData(state => ({
            ...state,
            claimId: claimId,
            subject: data?.claim?.subject,
            issueDescription: data?.claim?.issueDescription,
            filePath: data?.claim?.filePath,

        }));

        if (isEditSuccess) {
            navigate(`/report/${claimId}`);
            refetch();
        }
    }, [isSuccess, navigate, data, claimId, isEditSuccess, refetch]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        editClaim(formData);
    };

    const handleFieldsData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files;

        setFormData({ ...formData, file: selectedFile });
    };

    const validateSubject = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setError('Field is required!');
        } else {
            setError('');
        }
    };

    return (
        <> {(isLoading || isEditLoading) ? <Spinner /> :
            <div className="min-h-screen flex items-center justify-center text-central edit-claim">
                <div className='w-full max-w-md p-4'>
                    <h2 className="text-2xl font-semibold text-center text-central mb-4">Edit claim</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {(error as FirebaseError)?.message && <p className='edit-claim-error'>{(error as FirebaseError)?.message}</p>}

                        <div>
                            <label className="block font-medium" htmlFor='subject'>Subject</label>
                            <input
                                name='subject'
                                value={formData.subject}
                                onChange={handleFieldsData}
                                onBlur={validateSubject}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {err && (<p className='edit-claim-error'>{err}</p>)}

                        </div>
                        <div>
                            <label className="block font-medium" htmlFor='issueDescription'>Issue Description</label>
                            <textarea
                                name='issueDescription'
                                value={formData.issueDescription}
                                onChange={handleFieldsData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Attach File</label>
                            <input type="file" onChange={handleFileChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <button type="submit" className="text-white px-4 py-2 rounded-md">
                            Edit
                        </button>
                    </form>
                </div>
            </div>
        }
        </>
    );
}