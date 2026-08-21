import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const activitiesUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(activitiesUrl);

        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`);
        }

        const payload = await response.json();
        const records = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.results)
              ? payload.results
              : [];
        setActivities(records);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [activitiesUrl]);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.id}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-1 text-capitalize">{activity.type}</h3>
                <p className="text-muted mb-2">{new Date(activity.date).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm} km</p>
                <p className="mb-0"><strong>User ID:</strong> {activity.userId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;
