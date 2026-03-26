import { Navigation } from '@/components/navigation'
import { CheckCircle, Clock, BookOpen, FileText, Type, Target, ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/student/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Assignments</h1>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group cursor-pointer hover:border-indigo-300 transition-colors border-l-4 border-l-red-500">
            <div className="flex space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">World War 2 - Comprehensive Essay</h3>
                <p className="text-sm text-gray-500 mt-1">Due Today, 11:59 PM • History</p>
              </div>
            </div>
            <a href="/student/chat" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-indigo-700 transition">
              Start Assignment
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group cursor-pointer hover:border-indigo-300 transition-colors border-l-4 border-l-yellow-500">
            <div className="flex space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Algebra Fundamentals Worksheet</h3>
                <p className="text-sm text-gray-500 mt-1">Due Tomorrow • Mathematics</p>
              </div>
            </div>
            <button className="text-indigo-600 bg-indigo-50 font-semibold py-2 px-6 rounded-xl hover:bg-indigo-100 transition">
              Resume Draft
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Completed</h2>
           <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center opacity-80 border-l-4 border-l-green-500 hover:opacity-100 transition-opacity">
            <div className="flex space-x-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg line-through">Cell Biology Quiz</h3>
                <p className="text-sm text-gray-500 mt-1">Submitted Oct 12 • Final Score: 95/100</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-indigo-600 py-2 px-4 rounded-xl transition flex items-center space-x-2 font-medium bg-white border border-gray-200 shadow-sm">
              <Download className="w-4 h-4" /> <span>Download Feedback</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
