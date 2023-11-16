import { useState, ChangeEvent, FormEvent } from 'react';
import './Register.css';
import { RegisterFormData } from '../../types/RegisterFormData';
import Deadlines from './Deadlines/Deadlines';
import { HandleInputChange } from 'types/HandleInputChange';

export default function Register() {
  const [hidable, setHidable] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
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
  });

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
  };

  return (
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
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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
              className="w-full p-2 border border-gray-300 rounded"
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
              value={formData.firm}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value=""></option>
              <option value="customer">Customer</option>
              <option value="supplier">Supplier</option>
            </select>
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
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          {hidable && <Deadlines
            formData={formData}
            handleInputChange={handleInputChange}
          />}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full text-white p-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}