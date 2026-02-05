import React from 'react';
import { useState } from 'react';

export default function CourseModal({ course, onClose, onOpen }) {
    const [enrolled, setEnrolled] = useState(false);

    const handleEnroll = () => {
        // Logic to enroll the user in the course
        setEnrolled(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop overlay */}
            <div 
                className="fixed inset-0 backdrop-blur-sm bg-opacity-90"
                onClick={onClose}
            ></div>
            
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative z-10 mx-4">
                {/* Header with Course ID */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {course.course_title || course.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Course ID: {course.course_id || course.id}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Course Details */}
                <div className="space-y-4">
                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                            Description
                        </h3>
                        <p className="text-gray-700">
                            {course.course_description || course.description}
                        </p>
                    </div>

                    {/* Classroom Number */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                            Classroom
                        </h3>
                        <p className="text-gray-700">
                            {course.classroom_number || 'TBA'}
                        </p>
                    </div>

                    {/* Additional Info if available */}
                    {course.instructor && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                Instructor
                            </h3>
                            <p className="text-gray-700">{course.instructor}</p>
                        </div>
                    )}

                    {course.duration && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                Duration
                            </h3>
                            <p className="text-gray-700">{course.duration} hours</p>
                        </div>
                    )}

                    {course.capacity && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                Capacity
                            </h3>
                            <p className="text-gray-700">{course.capacity} students</p>
                        </div>
                    )}

                    {course.level && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                Level
                            </h3>
                            <p className="text-gray-700">{course.level}</p>
                        </div>
                    )}

                    {course.price !== undefined && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                                Price
                            </h3>
                            <p className="text-gray-700">${course.price}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                    {enrolled ? (
                        <div className="flex items-center text-green-600">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Enrolled in this course</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleEnroll}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Enroll Now
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
