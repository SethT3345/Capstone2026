import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch courses from your database/API
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            // Replace this URL with your actual API endpoint
            const response = await fetch('/api/courses');
            
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex'>
                <Navbar />
                <div className="right-side flex-1 min-h-screen bg-gray-100">
                    {/* Header */}
                    <Header />
                    
                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Available Courses
                            </h2>
                            <p className="text-gray-600">
                                Browse through our collection of courses
                            </p>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <div className="text-gray-600">Loading courses...</div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                <p>Error: {error}</p>
                            </div>
                        )}

                        {/* Courses Grid */}
                        {!loading && !error && courses.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCard 
                                        key={course.id || course._id} 
                                        course={course} 
                                    />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && courses.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">
                                    No courses available at the moment.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
