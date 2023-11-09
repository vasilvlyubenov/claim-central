import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import './App.css';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Login from 'components/Login';

function App() {

  return (
    <>
      <Header />
      <div className='content'>
          <Routes>
            <Route path='/' />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' />
          </Routes>
          
      </div>
      <Footer />
    </>
  );
}

export default App;
