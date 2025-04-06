'use client'
import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-lg mb-6">
          This is the home page built with Next.js 13+ and Tailwind CSS.
        </p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}
