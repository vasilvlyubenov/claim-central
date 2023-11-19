import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import './Login.css';
import { validateEmail, validatePassword } from '../../utils/helpers';
import Spinner from 'components/common/Spinner/Spinner';
import { useUserSignInQuery } from '../../features/user/userApi';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/user/userSlice';

const loginErrorsInitalState = {
  email: '',
  password: '',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(loginErrorsInitalState);
  const [isDisabled, setIsDisabled] = useState(false);
  const [skip, setSkip] = useState(true);
  const [userId, setUserId] = useState('');
  const { data: userData, isFetching, isSuccess: signSuccess, error } = useUserSignInQuery({ email, password }, { skip });
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (signSuccess) {
      setUserId(userData.uid);
      setSkip(true);
      dispatch(setUser({ uid: userData.uid, email: userData.email, refreshToken: userData.refreshToken, userType: userData.displayName }));
    }
    
  }, [signSuccess, userData, dispatch, userId, error]);

  // Email
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSkip(true);
  };

  const validateEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validateEmail(e.target.value);
    setErrors(state => ({ ...state, email: result.message }));
    setIsDisabled(result.type);
    setSkip(true);
  };

  // Password
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setSkip(true);
  };

  const validatePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const result = validatePassword(e.target.value);
    setErrors(state => ({ ...state, password: result.message }));
    setIsDisabled(result.type);
    setSkip(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSkip(false);
  };

  return (
    <>
      {isFetching ? <Spinner /> :
        <div className="flex items-center justify-center text-central login">
          <div className="w-full max-w-md p-4">
            <h2 className="text-2xl font-semibold text-center text-central mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              {error?.message && <p className='login-error'>{error?.message}</p>}
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium">
                  Email
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="email"
                  name="email"
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
      }
    </>
  );
}