import React, { useEffect, useState } from 'react';
import MyLearningCard from './MyLearningCard.jsx';

export default function EnrolledCourses({
  cardComponent: Card = MyLearningCard,
  children,
  gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/courses');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const all = await res.json();

        const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        if (!user) {
          setCourses([]);
          setLoading(false);
          return;
        }

        let classes = user.classes || [];
        if (typeof classes === 'string') {
          try {
            classes = JSON.parse(classes);
          } catch (e) {
            classes = [];
          }
        }

        const ids = new Set((classes || []).map((c) => String(c)));

        const my = all.filter((c) => ids.has(String(c.id)) || ids.has(String(c.course_id)));

        const mapped = my.map((r) => ({
          id: r.id,
          title: r.course_title || r.title || 'Untitled Course',
          instructor: r.instructor || '',
          description: r.course_description || r.description || '',
          progress: r.progress || 0,
          tag: r.course_id || (r.course_title ? r.course_title.split(' ')[0] : 'Course'),
        }));

        setCourses(mapped);
      } catch (err) {
        console.error('EnrolledCourses fetch error:', err);
        setError(err.message || 'Failed to load enrolled courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (typeof children === 'function') {
    return children({ courses, loading, error });
  }

  if (loading)
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading courses...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!courses || courses.length === 0)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        You are not enrolled in any courses yet.
      </div>
    );

  return (
    <div className={gridClass}>
      {courses.map((course) => (
        <Card key={course.id} course={course} />
      ))}
    </div>
  );
}
