import { ChangeEvent, FormEvent, useState } from 'react';
import './Login.css';
// import { useUserSignOutQuery } from '../../features/user/userSlice';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);    
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={changeEmailHandler}
              className="w-full p-2 border border-gray-300 rounded"
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
              value={password}
              onChange={changePasswordHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}