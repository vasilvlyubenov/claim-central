import { useEffect } from 'react';
import Header from './components/core/Header';
import Footer from './components/core/Footer';
import './App.css';
import * as userService from './services/userService';

function App() {
  useEffect(() => {
    const res = userService
      .isLoggedIn();

    console.log(res);


    return () => {
      res;
    };
  }, []);
  return (
    <>
    <Header/>
    <div className='content'>

    </div>
    <Footer />
    </>
  );
}

export default App;
