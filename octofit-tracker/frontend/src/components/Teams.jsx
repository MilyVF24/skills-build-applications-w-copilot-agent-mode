import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const teamsUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(teamsUrl);

        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`);
        }

        const payload = await response.json();
        const records = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.results)
              ? payload.results
              : [];
        setTeams(records);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [teamsUrl]);

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
