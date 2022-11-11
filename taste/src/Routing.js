import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { TopTracks, Profile, Login } from './pages';
import App from './App';

import React from 'react';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomeContent />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<AuthRoute />} />
          <Route path="home" element={<App />} />
        </Route>
      </Routes>
    </Router>
  );
}

function HomeContent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function AuthRoute() {
  return (
    <div>
      <Profile />
      <TopTracks />
    </div>
  );
}

export default Routing;
