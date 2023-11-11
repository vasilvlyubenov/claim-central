import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Profile from 'components/Profile/Profile';
import ChangePassword from 'components/ChangePassword/ChangePassword';

function App() {

  return (
    <>
      <Header />
      <div className='content'>
          <Routes>
            <Route path='/' />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </Routes>
          
      </div>
      <Footer />
    </>
  );
}

export default App;
