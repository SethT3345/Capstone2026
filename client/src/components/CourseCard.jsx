import React, { useState } from 'react';
import Button from './Button.jsx';
import CourseModal from './CourseModal.jsx';

export default function CourseCard({ course }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Course Image */}
            {course.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            {/* Course Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.course_title || course.title || 'Untitled Course'}
                </h3>
                
                <p className="text-xs text-gray-500 mb-3">
                    {course.course_id || course.id}
                </p>
                
                {course.instructor && (
                    <p className="text-sm text-gray-600 mb-3">
                        Instructor: {course.instructor}
                    </p>
                )}
                
                {(course.course_description || course.description) && (
                    <p className="text-gray-700 mb-4 line-clamp-3">
                        {course.course_description || course.description}
                    </p>
                )}
                
                {/* Course Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {course.classroom_number && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                            📍 {course.classroom_number}
                        </span>
                    )}
                    {course.duration && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {course.duration}
                        </span>
                    )}
                    {course.level && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            {course.level}
                        </span>
                    )}
                    {course.price !== undefined && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                            ${course.price}
                        </span>
                    )}
                </div>
                
                {/* Action Button */}
                <Button onClick={handleOpenModal}>
                    View Details
                </Button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <CourseModal 
                    course={course} 
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
