import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));

        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.id}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-1">{user.name}</h3>
                <p className="text-muted mb-2">{user.role}</p>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-0"><strong>Fitness level:</strong> {user.fitnessLevel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
