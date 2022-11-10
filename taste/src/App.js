import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotifyAuth';
import { catchErrors } from './utils';
import { TopTracks, Profile, Login } from './pages';

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
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div className="container">
        <header className="App-header">
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
        </header>
        <Router>
          <ScrollToTop />
          <Routes>
            {!token && <Route path="/login" element={<Login />} />}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;