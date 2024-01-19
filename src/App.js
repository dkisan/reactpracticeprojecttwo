import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/authcontext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem('isLoggedIn')
    if (isLogin === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1')
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', '0')
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}>
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
