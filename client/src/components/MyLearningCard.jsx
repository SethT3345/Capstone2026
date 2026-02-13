import React from 'react';

export default function MyLearningCard({ course }) {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleComplete = () => {
    if (loading || done) return;
    setLoading(true);
    // simulate async work (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  };

  const initials = (course.instructor || '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-20 h-14 bg-linear-to-br from-purple-500 to-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
          {(course.tag || '').toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.instructor}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 my-4 line-clamp-3">
        {course.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4">
        <div className="flex-1">{/*  */}</div>
        <button
          type="button"
          onClick={handleComplete}
          disabled={loading || done}
          aria-busy={loading}
          className={`px-4 py-2 rounded-lg text-sm text-white ${
            done ? 'bg-gray-400 cursor-default' : 'bg-purple-600 hover:bg-purple-700'
          } flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Completing...
            </>
          ) : done ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z"
                  clipRule="evenodd"
                />
              </svg>
              Completed
            </>
          ) : (
            'Complete'
          )}
        </button>
      </div>
    </article>
  );
}
