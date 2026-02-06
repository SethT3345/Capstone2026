import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [searching, setSearching] = useState(false);

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

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSearchError('Please enter a course name');
            return;
        }
        
        setSearching(true);
        setSearchError('');
        setSearchResults(null);
        
        try {
            const response = await fetch('/api/search-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName: searchQuery }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setSearchError(data.message || data.error || 'Course not found');
                setSearchResults(null);
            } else {
                setSearchResults(data.course);
                setSearchError('');
                console.log('Course found:', data.course);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchError('Failed to search. Please try again.');
            setSearchResults(null);
        } finally {
            setSearching(false);
        }
    };

    return (
        <>
            <div className='flex'>
                <Navbar />
                <div className="right-side flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 ml-64">
                    {/* Header */}
                    <Header 
                        onSearch={handleSearch} 
                        searching={searching}
                        searchError={searchError}
                    />
                    
                    {/* Main Content */}
                    <main className="pt-28 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {/* Search Results Section */}
                        {searchResults && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        Search Results
                                    </h2>
                                    <button
                                        onClick={() => setSearchResults(null)}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <CourseCard 
                                        key={searchResults.course_id || searchResults.id}
                                        course={{
                                            course_id: searchResults.course_id || searchResults.id,
                                            course_title: searchResults.course_title,
                                            course_description: searchResults.course_description || searchResults.description,
                                            classroom_number: searchResults.classroom_number,
                                            instructor: searchResults.instructor,
                                            capacity: searchResults.capacity,
                                            duration: searchResults.duration,
                                            level: searchResults.level,
                                            price: searchResults.price
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* All Courses Section */}
                        {!searchResults && (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                        Available Courses
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Browse through our collection of courses
                                    </p>
                                </div>

                                {/* Loading State */}
                                {loading && (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="text-gray-600 dark:text-gray-400">Loading courses...</div>
                                    </div>
                                )}

                                {/* Error State */}
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
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
                                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                                            No courses available at the moment.
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
