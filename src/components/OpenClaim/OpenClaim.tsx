import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

import './OpenClaim.css';

import { OpenClaimSubmit } from '../../types/OpenClaimSubmit';
import { useOpenClaimMutation } from '../../features/claim/claimApi';
import Spinner from 'components/common/Spinner/Spinner';
import { useAppSelector } from '../../app/hooks';


const initialState: OpenClaimSubmit = {
    subject: '',
    issueDescription: '',
    file: null,
    supplierId: '',
    deadlines: {
        d3: null,
        d4: null,
        d5: null,
        d6: null,
        d7: null,
        d8: null,
    }
};

export default function OpenClaim() {
    const { supplierId } = useParams();
    const [err, setError] = useState('');
    const navigate = useNavigate();
    const [openClaim, { isLoading, isSuccess, error }] = useOpenClaimMutation();
    const selector = useAppSelector(selector => selector.user);

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (supplierId) {
            setFormData(state => ({
                ...state,
                supplierId: supplierId,
                deadlines: {
                    d3: selector.deadlines.d3,
                    d4: selector.deadlines.d4,
                    d5: selector.deadlines.d5,
                    d6: selector.deadlines.d6,
                    d7: selector.deadlines.d7,
                    d8: selector.deadlines.d8,
                }
            }));
        }

        if (isSuccess) {
            navigate('/new-claim');
        }
    }, [supplierId, isSuccess, navigate, selector]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        openClaim(formData);
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
        <> {isLoading ? <Spinner /> :
            <div className="min-h-screen flex items-center justify-center text-central claim">
                <div className='w-full max-w-md p-4'>
                    <h2 className="text-2xl font-semibold text-center text-central mb-4">Initiate 8D Report</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {(error as FirebaseError)?.message && <p className='claim-error'>{(error as FirebaseError)?.message}</p>}

                        <div>
                            <label className="block font-medium" htmlFor='subject'>Subject</label>
                            <input
                                name='subject'
                                value={formData.subject}
                                onChange={handleFieldsData}
                                onBlur={validateSubject}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {err && (<p className='open-error'>{err}</p>)}

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
                            Initiate 8D Report
                        </button>
                    </form>
                </div>
            </div>
        }
        </>
    );
}