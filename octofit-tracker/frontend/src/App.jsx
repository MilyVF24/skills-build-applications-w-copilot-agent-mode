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
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <div className="api-banner">
          <span className="api-label">API base:</span>
          <code>{apiBaseUrl}</code>
        </div>
        <p className="api-help">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a Codespaces URL.
          If it is unset, the app falls back to <code>http://localhost:8000/api</code>.
        </p>
      </header>

      <nav className="app-nav">
        <div className="app-nav-brand">OctoFit</div>
        <div className="app-nav-links">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `app-nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="app-main">
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
