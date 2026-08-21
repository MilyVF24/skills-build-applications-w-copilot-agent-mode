import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
  const usersUrl = `${apiBaseUrl}/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersUrl);

        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }

        const payload = await response.json();
        const records = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.results)
              ? payload.results
              : [];
        setUsers(records);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [usersUrl]);

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="content-panel">
      <h2 className="section-title">Users</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user._id || user.id}>
            <h3>{user.name}</h3>
            <p className="user-role">{user.role}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Fitness level:</strong> {user.fitnessLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
