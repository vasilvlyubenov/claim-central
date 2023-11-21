import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';

import { useGetAllSuppliersQuery } from '../../features/user/userApi';

import Spinner from 'components/common/Spinner/Spinner';

import './NewClaim.css';
import { useNavigate } from 'react-router-dom';

export default function NewClaim() {
    const { data, isFetching, error, isSuccess } = useGetAllSuppliersQuery([]);
    const [supplierId, setSupplierId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setSupplierId(data[0].userId);
        }
    }, [isSuccess, setSupplierId, data]);

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSupplierId(e.target.value);
    };

    const handleClaimSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        navigate(`/open-claim/${supplierId}`);
    };

    return (
        <>
            {isFetching ? <Spinner /> :
                <div className="min-h-screen flex items-center justify-center text-central open">
                    <div className="w-full max-w-md p-4">
                        {(error as FirebaseError)?.message && <p className='login-error'>{(error as FirebaseError)?.message}</p>}
                        <h2 className='text-2xl font-semibold text-center text-central mb-4'>New claim</h2>
                        <form onSubmit={handleClaimSubmit}>
                            <div className="mb-4">
                                <label className='block font-medium' htmlFor="supplier">Select supplier representative:</label>
                                <select className="w-full p-2 border border-gray-300 rounded" name="supplier" id="supplier-select"
                                    value={supplierId}
                                    onChange={handleSelect}>
                                    {data?.map((d) => <option key={d.userId} value={d.userId}>{d.email} - {d.firm}</option>)}
                                </select>
                                <button
                                    type="submit"
                                    className="w-full text-white p-2 rounded"
                                >
                                    Open claim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    );
}