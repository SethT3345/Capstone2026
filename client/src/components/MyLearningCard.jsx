import React from 'react';

export default function MyLearningCard({ course }) {
  const initials = (course.instructor || '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-20 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
          {(course.tag || '').toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.instructor}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {course.progress || 0}%
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 my-4 line-clamp-3">
        {course.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${course.progress || 0}%` }}
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
          Continue
        </button>
      </div>
    </article>
  );
}
