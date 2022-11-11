import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { logout, getCurrentUserProfile } from './spotifyAuth';
import { catchErrors } from './utils';
import { Login } from './pages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!token ? (
        <Login />
      ) : (
        <>
          <nav className="nav-button-container">
            <button className="log-out-button" onClick={logout}>
              Log Out
            </button>
          </nav>
        </>
      )}
      <ScrollToTop />
    </ChakraProvider>
  );
}

export default App;
