import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Profile from 'components/Profile/Profile';
import ChangePassword from 'components/ChangePassword/ChangePassword';
import NewClaim from 'components/NewClaim/NewClaim';
import AuthComponent from 'components/AuthComponent/AuthComponent';
import OpenClaim from 'components/OpenClaim/OpenClaim';
import SupplierOpenClaims from 'components/SupplierOpenClaims/SupplierOpenClaims';

function App() {

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
            <Route path='/open-claim/:supplierId' element={<OpenClaim />} />
          </Route>

          <Route element={<AuthComponent allowedRole='supplier' />}>
            <Route path='/open-claims' element={<SupplierOpenClaims />} />
          </Route>

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
