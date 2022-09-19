import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { TopTracks, Profile, Login } from "./pages";
import "./styles/App.css";

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
            <Router>
              <ScrollToTop />
              <Routes>
                {!token && <Route path="/login" element={<Login />} />}
                <Route path="/profile" element={<Profile />} />
                <Route path="/toptracks" element={<TopTracks />}></Route>
                <Route path="/" element={<Profile />} />
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
