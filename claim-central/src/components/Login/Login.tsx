import { ChangeEvent, FormEvent, useState } from 'react';
import './Login.css';
import { validateEmail, validatePassword } from '../../utils/helpers';
// import { useUserSignOutQuery } from '../../features/user/userSlice';

const loginErrorsInitalState = {
  email: '',
  password: '',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(loginErrorsInitalState);
  const [isDisabled, setIsDisabled] = useState(false);

  // Email
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);    
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {    
    const result = validateEmail(e.target.value);

    if (result.type === false) {
      setErrors(state => ({...state, email: result.message}));
      setIsDisabled(true);
    } else {
      setErrors(state => ({...state, email: ''}));
      setIsDisabled(false);
    }
  };

  const validatePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validatePassword(e.target.value);

    if (result.type === false) {      
      setErrors(state => ({...state, password: result.message}));
      setIsDisabled(true);
    } else {
      setErrors(state => ({...state, password: ''}));
      setIsDisabled(false);
    }
  };

  // const { data } = useUserSignInQuery({ email: 'vasil.lyubenov@gmail.com', password: '123123' });
  // const { data } = useUserSignOutQuery();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('Login form submitted:');
  };

  return (
    <div className="flex items-center justify-center text-central login">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold text-center text-central mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={changeEmailHandler}
              onBlur={validateEmailHandler}
              required
            />
          {errors.email && (<p className='login-error'>{errors.email}</p>)}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={changePasswordHandler}
              onBlur={validatePasswordHandler}
              required
            />
          {errors.password && (<p className='login-error'>{errors.password}</p>)}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
              disabled={isDisabled}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}