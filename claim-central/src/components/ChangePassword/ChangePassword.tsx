import { useState, ChangeEvent, FormEvent } from 'react';
import './ChangePassword.css';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [changePasswordData, setChangePasswordData] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    console.log('Password changed:', changePasswordData);
    
    setChangePasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-central change-password">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block font-medium">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={changePasswordData.currentPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={changePasswordData.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={changePasswordData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full text-white p-2 rounded "
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}