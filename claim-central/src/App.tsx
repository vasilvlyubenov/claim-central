import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';

function App() {

  return (
    <>
      <Header />
      <div className='content'>
          <Routes>
            <Route path='/' />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
          </Routes>
          
      </div>
      <Footer />
    </>
  );
}

export default App;
