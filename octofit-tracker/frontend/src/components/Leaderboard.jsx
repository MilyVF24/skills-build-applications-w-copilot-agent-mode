import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard'));

        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`);
        }

        const payload = await response.json();
        setLeaderboard(normalizeRecords(payload));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="list-group">
          {leaderboard.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.rank}>
              <div>
                <div className="fw-semibold">#{entry.rank} {entry.name}</div>
                <small className="text-muted">User ID: {entry.userId}</small>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
