import { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const leaderboardUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardUrl);

        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`);
        }

        const payload = await response.json();
        const records = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.results)
              ? payload.results
              : [];
        setLeaderboard(records);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [leaderboardUrl]);

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
