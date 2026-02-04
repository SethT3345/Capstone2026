import { useState } from 'react';

function Test() {
  const [courseName, setCourseName] = useState('');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCourse(null);

    try {
      const response = await fetch('/api/search-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName }),
      });

      const data = await response.json();

      if (response.ok) {
        setCourse(data.course);
      } else {
        setError(data.message || data.error || 'Course not found');
      }
    } catch (err) {
      setError('Failed to search for course. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Course Search</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name..."
          style={{
            padding: '10px',
            width: '70%',
            marginRight: '10px',
            fontSize: '16px'
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !courseName}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          {error}
        </div>
      )}

      {course && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Course Found!</h2>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '3px' }}>
            {JSON.stringify(course, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Test;