import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import MyLearningCard from '../components/MyLearningCard.jsx'
import EnrolledCourses from '../components/EnrolledCourses.jsx'

export default function MyLearning() {
  return (
    <div className='flex'>
      <Navbar />
      <div className="right-side flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 ml-64">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Learning</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Your enrolled courses and progress.</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search courses"
                  value={''}
                  onChange={() => {}}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"
                />
                <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                  <option>Sort: Recent</option>
                  <option>Sort: Progress</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <EnrolledCourses cardComponent={MyLearningCard} />
          </div>
        </main>
      </div>
    </div>
  )
}
