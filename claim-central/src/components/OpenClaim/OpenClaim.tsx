import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './OpenClaim.css';

import { OpenClaim } from '../../types/OpenClaim';
import { useOpenClaimMutation } from '../../features/claim/claimApi';
import Spinner from 'components/common/Spinner/Spinner';


const initialState: OpenClaim = {
    issueDescription: '',
    file: null,
    supplierId: '',
};

export default function OpenCLaim() {
    const { supplierId } = useParams();
    const [openClaim, { isLoading }] = useOpenClaimMutation();

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (supplierId) {
            setFormData(state => ({ ...state, supplierId: supplierId }));
        }
    }, [supplierId]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        openClaim(formData);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files;

        setFormData({ ...formData, file: selectedFile });
    };

    return (
        <> {isLoading ? <Spinner /> :
            <div className="min-h-screen flex items-center justify-center text-central claim">
                <div className='w-full max-w-md p-4'>
                    <h2 className="text-2xl font-semibold text-center text-central mb-4">Initiate 8D Report</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium" htmlFor='issueDescription'>Issue Description</label>
                            <textarea
                                name='issueDescription'
                                value={formData.issueDescription}
                                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
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