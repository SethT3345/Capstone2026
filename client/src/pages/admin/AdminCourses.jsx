import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({
    code: '',
    title: '',
    description: '',
    classroomNumber: '',
    seats: '',
    creditHours: '',
    tuitionCost: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/courses');
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingCourse(null);
    setForm({
      code: '',
      title: '',
      description: '',
      classroomNumber: '',
      seats: '',
      creditHours: '',
      tuitionCost: '',
    });
    setIsModalOpen(true);
  }

  function openEdit(course) {
    setEditingCourse(course.id);
    setForm({
      code: course.course_id || course.course_code || course.code || '',
      title: course.course_title || course.title || '',
      description: course.course_description || course.description || course.instructor || '',
      classroomNumber: String(course.classroom_number || course.classroomNumber || ''),
      seats: String(course.capacity || course.seats || ''),
      creditHours: String(course.credit_hours || course.creditHours || ''),
      tuitionCost: String(course.tuition_cost || course.tuitionCost || ''),
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingCourse(null);
    setForm({
      code: '',
      title: '',
      description: '',
      classroomNumber: '',
      seats: '',
      creditHours: '',
      tuitionCost: '',
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      code: form.code.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      classroomNumber: form.classroomNumber.trim(),
      seats: Number(form.seats) || 0,
      creditHours: Number(form.creditHours) || 0,
      tuitionCost: Number(form.tuitionCost) || 0,
    };

    if (editingCourse) {
      // Update existing course via API
      try {
        const response = await fetch(`/api/editClass/${editingCourse}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Class updated successfully:', data);
          // Refresh the courses list
          await fetchCourses();
          closeModal();
        } else {
          console.error('Error updating class:', data.error);
          alert(data.error || 'Failed to update class');
        }
      } catch (error) {
        console.error('Error updating class:', error);
        alert('Failed to update class. Please try again.');
      }
    } else {
      // Create new course via API
      try {
        const response = await fetch('/api/createClass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Class created successfully:', data);
          // Refresh the courses list
          await fetchCourses();
          closeModal();
        } else {
          console.error('Error creating class:', data.error);
          alert(data.error || 'Failed to create class');
        }
      } catch (error) {
        console.error('Error creating class:', error);
        alert('Failed to create class. Please try again.');
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this course?')) return;

    try {
      const response = await fetch(`/api/deleteClass/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Class deleted successfully:', data);
        // Refresh the courses list
        await fetchCourses();
      } else {
        console.error('Error deleting class:', data.error);
        alert(data.error || 'Failed to delete class');
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class. Please try again.');
    }
  }

  return (
    <div className="flex">
      <Navbar />

      <div className="right-side flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64">
        <Header />

        <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-4"
          >
            ← Back to Admin Dashboard
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Manage Courses
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create, edit, or remove courses here.
                </p>
              </div>
              <div>
                <button
                  onClick={openCreate}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  + Create New Course
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                      Instructor
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                      Capacity
                    </th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-300"
                      >
                        Loading courses...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-red-600 dark:text-red-400"
                      >
                        Error: {error}
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-300"
                      >
                        No courses yet. Create one.
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id || course.course_id}>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {course.id || course.course_id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {course.course_title || course.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {course.instructor}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {course.capacity || course.seats}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button
                            onClick={() => openEdit(course)}
                            className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-40" onClick={closeModal}></div>
              <form
                onSubmit={handleSubmit}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {editingCourse ? 'Edit Course' : 'Create Course'}
                </h2>

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Course_id
                </label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Description
                </label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Classroom Number
                </label>
                <input
                  name="classroomNumber"
                  value={form.classroomNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Room 101"
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">Seats</label>
                <input
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Credit Hours
                </label>
                <input
                  name="creditHours"
                  value={form.creditHours}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Tuition Cost
                </label>
                <input
                  name="tuitionCost"
                  value={form.tuitionCost}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 mb-4 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="0.00"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    {editingCourse ? 'Save' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
