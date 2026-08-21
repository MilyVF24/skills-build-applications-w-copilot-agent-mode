import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));

        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.id}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-1">{workout.title}</h3>
                <p className="text-muted mb-2 text-capitalize">{workout.level}</p>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
