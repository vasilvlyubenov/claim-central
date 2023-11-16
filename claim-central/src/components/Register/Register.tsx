import { useState, ChangeEvent, FormEvent } from 'react';
import './Register.css';
import { RegisterFormData } from '../../types/RegisterFormData';
import Deadlines from './Deadlines/Deadlines';
import { HandleInputChange } from 'types/HandleInputChange';
import Spinner from 'components/common/Spinner/Spinner';
import { validatePassword } from './../../utils/helpers';
import { validateEmail } from './../../utils/helpers';

const initialState: RegisterFormData = {
  email: '',
  password: '',
  repeatPassword: '',
  firm: '',
  userType: '',
  address: '',
  d3: '',
  d4: '',
  d5: '',
  d6: '',
  d7: '',
  d8: '',
};

const initialErrorsState = {
  email: '',
  password: '',
  repeatPassword: '',
  firm: '',
  userType: '',
  address: '',
  errors: {},
};

export default function Register() {
  const [hidable, setHidable] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);


  const handleInputChange: HandleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'userType') {
      if (value === 'customer') {
        setHidable(true);
      } else {
        setHidable(false);
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('Registration form submitted:', formData);
    // if (error) {
    //   setErrors(state => ({...state, error: error}));
    // } else {
    //   setErrors(state => ({...state, error: {}}));
    // }
  };

  const validateEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validateEmail(e.target.value);
    setErrors(state => ({ ...state, email: result.message }));
    setDisabled(result.type);
  };

  const validatePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validatePassword(e.target.value, 1);
    setErrors(state => ({ ...state, password: result.message }));
    setDisabled(result.type);
  };

  const validateRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setErrors(state => ({ ...state, repeatPassword: 'Field is required' }));
      setDisabled(true);
    } else if (e.target.value !== formData.password) {
      setErrors(state => ({ ...state, repeatPassword: 'Password doesn\'t match' }));
      setDisabled(true);
    } else {
      setErrors(state => ({ ...state, repeatPassword: '' }));
      setDisabled(false);
    }
  };

  const validateFirmHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setErrors(state => ({ ...state, firm: 'Field is required' }));
      setDisabled(true);
    } else {
      setErrors(state => ({ ...state, firm: '' }));
      setDisabled(false);
    }
  };

  const validateTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setErrors(state => ({ ...state, userType: 'Field is required' }));
      setDisabled(true);
    } else {
      setErrors(state => ({ ...state, userType: '' }));
      setDisabled(false);
    }
  };

  const validateAddresHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);

    if (e.target.value === '') {
      setErrors(state => ({ ...state, address: 'Field is required' }));
      setDisabled(true);
    } else {
      setErrors(state => ({ ...state, address: '' }));
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-central register">
        <div className="w-full max-w-md p-4">
          <h2 className="text-2xl font-semibold text-center text-central mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={validateEmailHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.email && (<p className='reg-error'>{errors.email}</p>)}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={validatePasswordHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.password && (<p className='reg-error'>{errors.password}</p>)}
            </div>
            <div className="mb-4">
              <label htmlFor="repeatPassword" className="block font-medium">
                Repeat Password
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                onBlur={validateRepeatPasswordHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.repeatPassword && (<p className='reg-error'>{errors.repeatPassword}</p>)}
            </div>
            <div className="mb-4">
              <label htmlFor="firm" className="block font-medium">
                Firm
              </label>
              <input
                type="text"
                id="firm"
                name="firm"
                value={formData.firm}
                onChange={handleInputChange}
                onBlur={validateFirmHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.firm && (<p className='reg-error'>{errors.firm}</p>)}
            </div>
            <div className="mb-4">
              <label htmlFor="userType" className="block font-medium">
                Choose customer or supplier
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                onBlur={validateTypeHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value=""></option>
                <option value="customer">Customer</option>
                <option value="supplier">Supplier</option>
              </select>
              {errors.userType && (<p className='reg-error'>{errors.userType}</p>)}

            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-medium">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={validateAddresHandler}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
              {errors.address && (<p className='reg-error'>{errors.address}</p>)}

            </div>

            {hidable && <Deadlines
              formData={formData}
              handleInputChange={handleInputChange}
              handleDisabled={setDisabled}
            />}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full text-white p-2 rounded"
                disabled={disabled}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Spinner />
    </>
  );
}