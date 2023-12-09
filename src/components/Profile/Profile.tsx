import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';

import { useGetUserInfoQuery, useUpdateUserDataMutation } from '../../features/user/userApi';
import { RegisterFormData } from 'types/RegisterFormData';

import Spinner from 'components/common/Spinner/Spinner';
import Deadlines from '../Deadlines/Deadlines';

import './Profile.css';


const initialUserData: RegisterFormData = {
    email: '',
    password: '',
    repeatPassword: '',
    firm: '',
    userType: '',
    address: '',
    deadlines: {
        d3: '',
        d4: '',
        d5: '',
        d6: '',
        d7: '',
        d8: ''
    }
};

export default function UserInfoPage() {

    const [userData, setUserData] = useState(initialUserData);
    const [isCustomer, setIsCustomer] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { data: inputData, isFetching, isSuccess: inputSuccess, error: inputDataError, refetch } = useGetUserInfoQuery([]);
    const [updateUser, {data, error, isLoading, isSuccess }] = useUpdateUserDataMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (inputSuccess) {
            setUserData(state => ({ ...state, ...inputData }));

            if (inputData?.userType === 'customer') {
                setIsCustomer(true);
            }
        }

        if (isSuccess) {
            refetch();
        }

    }, [inputData, inputSuccess, isSuccess, refetch]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
            deadlines: { ...userData.deadlines, [name]: value }
        });

        if (name === 'userType') {
            if (value === 'customer') {
                setIsCustomer(true);
            } else {
                setIsCustomer(false);
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateUser(userData);
    };

    return (
        <>
            {isFetching || isLoading ? <Spinner /> :
                <div className="min-h-screen flex items-center justify-center text-central profile">
                    <div className="w-full max-w-md p-4">
                        <h2 className="text-2xl font-semibold text-center text-central mb-4">User Information</h2>
                        <form onSubmit={handleSubmit}>  
                            {(inputDataError as FirebaseError)?.message && <p className='profile-error'>{(inputDataError as FirebaseError)?.message}</p>}
                            {(error as FirebaseError)?.message && <p className='profile-error'>{(error as FirebaseError)?.message}</p>}
                            {data && <p className='profile-success'>{data}</p>}
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    disabled={true}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="firm" className="block font-medium">
                                    Firm
                                </label>
                                <input
                                    type="text"
                                    id="firm"
                                    name="firm"
                                    value={userData.firm}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="userType" className="block font-medium">
                                    User Type
                                </label>
                                <select
                                    id="userType"
                                    name="userType"
                                    value={userData.userType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="customer">
                                        Customer
                                    </option>
                                    <option value="supplier">
                                        Supplier
                                    </option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block font-medium">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                                    rows={4}
                                    required
                                />
                            </div>

                            {isCustomer && <Deadlines formData={userData} handleDisabled={setDisabled} handleInputChange={handleInputChange} />}
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="w-full text-white p-2 rounded"
                                    disabled={disabled}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    );
}