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
import EightDReportPage from 'components/EightDReport/EightDReport';
import CustomerClaims from 'components/CustomerClaims/CustomerClaims';
import EditClaim from 'components/EditClaim/EditClaim';
import Dashboard from 'components/Dashboard/Dashboard';

function App() {

  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Dashboard />} />

          <Route element={<AuthComponent allowedRole='' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<AuthComponent allowedRole='user' />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/report/:claimId' element={<EightDReportPage />} />
          </Route>

          <Route element={<AuthComponent allowedRole='customer' />}>
            <Route path='/new-claim' element={<NewClaim />} />
            <Route path='/open-claim/:supplierId' element={<OpenClaim />} />
            <Route path='/customer-claims' element={<CustomerClaims />} />
            <Route path='/edit/:claimId' element={<EditClaim />} />
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
