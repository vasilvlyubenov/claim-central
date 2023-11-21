import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import { useAppDispatch } from './app/hooks';
import { setUser } from './features/user/userSlice';

import './App.css';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Profile from 'components/Profile/Profile';
import ChangePassword from 'components/ChangePassword/ChangePassword';
import NewClaim from 'components/NewClaim/NewClaim';
import AuthComponent from 'components/AuthComponent/AuthComponent';
import OpenCLaim from 'components/OpenClaim/OpenClaim';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        dispatch(setUser({ uid: res.uid, email: res.email, refreshToken: res.refreshToken, userType: res.displayName }));
      } else {
        return null;
      }
      return () => unsubscribe();
    });
  }, [dispatch]);


  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' />

          <Route element={<AuthComponent allowedRole='' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<AuthComponent allowedRole='user' />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </Route>

          <Route element={<AuthComponent allowedRole='customer' />}>
            <Route path='/new-claim' element={<NewClaim />} />
            <Route path='/open-claim/:supplierId' element={<OpenCLaim />} />
          </Route>

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
