import React from 'react';

export default function CourseCard({ course }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            
            {/* Course Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.course_title || 'Untitled Course'}
                </h3>
                
                {/* Course Details Grid */}
                <div className="space-y-3 mb-4">
                    {course.instructor && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Instructor:</span>
                            <span className="text-sm text-gray-800">{course.instructor}</span>
                        </div>
                    )}
                    
                    {course.capacity !== undefined && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Capacity:</span>
                            <span className="text-sm text-gray-800">{course.capacity} students</span>
                        </div>
                    )}
                    
                    {course.time && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Time:</span>
                            <span className="text-sm text-gray-800">{course.time}</span>
                        </div>
                    )}
                    
                    {course.location && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Location:</span>
                            <span className="text-sm text-gray-800">{course.location}</span>
                        </div>
                    )}

                    {course.course_code && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Code:</span>
                            <span className="text-sm text-gray-800">{course.course_code}</span>
                        </div>
                    )}

                    {course.credits && (
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-600 w-24">Credits:</span>
                            <span className="text-sm text-gray-800">{course.credits}</span>
                        </div>
                    )}
                </div>
                
                {/* Action Button */}
                <button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    onClick={() => {
                        console.log('Enroll in course:', course);
                        // Add enrollment logic here
                    }}
                >
                    Enroll Now
                </button>
            </div>
        </div>
    );
}
