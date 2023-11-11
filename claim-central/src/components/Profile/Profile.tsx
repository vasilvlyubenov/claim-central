import { useState, ChangeEvent, FormEvent } from 'react';
import './Profile.css';

interface UserData {
    email: string;
    password: string;
    firm: string;
    userType: 'customer' | 'supplier';
    address: string;
}

export default function UserInfoPage() {
    const initialUserData: UserData = {
        email: 'user@example.com',
        password: '********',
        firm: 'ABC Corporation',
        userType: 'customer',
        address: '123 Main St, Cityville',
    };

    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleEditToggle = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            // Add your update user logic here, using userData
            console.log('User information updated:', userData);
        }
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-central profile">
            <div className="w-full max-w-md p-4">
                <h2 className="text-2xl font-semibold text-center text-central mb-4">User Information</h2>
                <form onSubmit={handleSubmit}>
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
                            readOnly={!isEditing}
                            required
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
                            readOnly={!isEditing}
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
                            disabled
                            required
                        >
                            <option value="customer" disabled>
                                Customer
                            </option>
                            <option value="supplier" disabled>
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
                            readOnly={!isEditing}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {isEditing ? (
                            <>
                                <button
                                    type="submit"
                                    className="w-full text-white p-2 rounded"
                                >
                                    Save Changes
                                </button>
                                <button
                                    key={'cancel-edit'}
                                    type="button"
                                    className="w-full  text-white p-2 rounded mt-2"
                                    onClick={handleEditToggle}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                key={'toggle-edit'}
                                type="button"
                                className="w-full text-white p-2 rounded"
                                onClick={handleEditToggle}
                            >
                                Edit Credentials
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}