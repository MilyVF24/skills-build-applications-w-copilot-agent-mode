import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';
import './App.css';

const navigation = [
  { to: '/', label: 'Users', end: true },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-semibold mb-2">OctoFit Tracker</h1>
        <p className="text-muted mb-0">
          API base: <code>{apiBaseUrl}</code>
        </p>
        <p className="small text-muted mt-2 mb-0">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a Codespaces URL.
          If it is unset, the app falls back to <code>http://localhost:8000/api</code>.
        </p>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4 px-3">
        <div className="container-fluid px-0">
          <span className="navbar-brand me-3">OctoFit</span>
          <div className="navbar-nav d-flex flex-row flex-wrap gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-light text-dark' : 'text-white-50'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
