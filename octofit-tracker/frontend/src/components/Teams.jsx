import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));

        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-1">{team.name}</h3>
                <p className="text-muted mb-2">Goal</p>
                <p className="mb-2">{team.goal}</p>
                <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
