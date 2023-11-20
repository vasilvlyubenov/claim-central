import { useState, ChangeEvent, FormEvent } from 'react';
import './ChangePassword.css';
import { validatePassword } from '../../utils/helpers';
import { useUpdatePaswordMutation } from '../../features/user/userApi';
import { FirebaseError } from 'firebase/app';

const initialState = {
  newPassword: '',
  confirmPassword: '',
};

const initialErrorState = {
  newPassword: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const [changePasswordData, setChangePasswordData] = useState(initialState);
  const [errors, setError] = useState(initialErrorState);
  const [disabled, setDisabled] = useState(false);
  const [updatePassword, { data, isSuccess, error }] = useUpdatePaswordMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    updatePassword(changePasswordData.newPassword);

    setChangePasswordData(initialState);
  };

  const validateNewPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validatePassword(e.target.value, 1);
    setError(state => ({ ...state, newPassword: result.message }));
    setDisabled(result.type);
  };

  const validateNewRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError(state => ({ ...state, confirmPassword: 'Field is required' }));
      setDisabled(true);
    } else if (e.target.value !== changePasswordData.newPassword) {
      setError(state => ({ ...state, confirmPassword: 'Password doesn\'t match' }));
      setDisabled(true);
    } else {
      setError(state => ({ ...state, confirmPassword: '' }));
      setDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-central change-password">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Change Password</h2>
        {isSuccess && <p className='passSuccess'>{data}</p>}
        <form onSubmit={handleSubmit}>
        {(error as FirebaseError)?.message && <p className='change-error'>{(error as FirebaseError)?.message}</p>}
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
              onBlur={validateNewPasswordHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.newPassword && (<p className='new-pass-error'>{errors.newPassword}</p>)}
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
              onBlur={validateNewRepeatPasswordHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.confirmPassword && (<p className='new-pass-error'>{errors.confirmPassword}</p>)}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full text-white p-2 rounded"
              disabled={disabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}