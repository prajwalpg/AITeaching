'use client'

import { Navigation } from '@/components/navigation'
import { ArrowLeft, Upload, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function GenerateNewContentPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <Link href="/teacher/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Generate Content</h1>
          <p className="text-gray-500 mt-2 mb-8">Upload textbook chapters to automatically generate notes via the Content Agent.</p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer mb-6">
             <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
             <p className="text-gray-700 font-semibold mb-1">Click to upload textbook PDF or Drag and Drop</p>
             <p className="text-xs text-gray-500">Supports NCERT, State Board Syllabus (PDF, DOCX)</p>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" placeholder="e.g. Science" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic Name</label>
              <input type="text" placeholder="e.g. Light Reflection" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            </div>
          </div>

          {done ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-green-700 flex items-center mb-6">
               <CheckCircle className="w-6 h-6 mr-3" /> 
               <div>
                  <h3 className="font-bold">Generation Complete!</h3>
                  <p className="text-sm">Content generated and auto-assigned. Student notification sent.</p>
               </div>
            </div>
          ) : (
            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Content Agent is Analyzing...' : 'Generate Notes & Worksheets'}
            </button>
          )}

          {done && (
            <Link href="/teacher/knowledge-base" className="w-full block text-center border font-bold py-3 mt-4 rounded-xl hover:bg-gray-50">
              View in Knowledge Base
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
