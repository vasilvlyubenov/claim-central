import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Profile from 'components/Profile/Profile';
import ChangePassword from 'components/ChangePassword/ChangePassword';
import { ProtectedRouteProps } from 'types/ProtectedRouteProps';
import { useAppDispatch, useAppSelector } from './app/hooks';
import AuthRouteGuard from './guards/AuthRouteGuard';
import LoggedInRouteGuard from './guards/LoggedInRouteGuard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { setUser } from './features/user/userSlice';
import NewClaim from 'components/NewClaim/NewClaim';

function App() {
  const user = useAppSelector((state) => state.user);
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

  const protectedRouteProps: Omit<ProtectedRouteProps, 'component'> = {
    isAuth: !!user.uid,
  };

  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' />
          <Route path='/login' element={<LoggedInRouteGuard {...protectedRouteProps} component={<Login />} />} />
          <Route path='/register' element={<LoggedInRouteGuard {...protectedRouteProps} component={<Register />} />} />
          <Route path='/profile' element={<AuthRouteGuard {...protectedRouteProps} component={<Profile />} />} />
          <Route path='/change-password' element={<AuthRouteGuard {...protectedRouteProps} component={<ChangePassword />} />} />
          <Route path='/new-claim' element={<AuthRouteGuard {...protectedRouteProps} component={<NewClaim />} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
