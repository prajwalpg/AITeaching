'use client'

import { Navigation } from '@/components/navigation'
import { FileText, Sparkles, Settings, Download, Search, Upload, CheckCircle, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function QuestionPapersPage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <Link href="/teacher/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Question Papers</h1>
            <p className="text-gray-600 mt-2">Auto-generate exams and quizzes from your approved Knowledge Base or Textbooks.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content - Generated Papers */}
          <div className="lg:col-span-2 space-y-6">
            
            {generated && (
              <div className="bg-white rounded-xl shadow-lg border border-indigo-200 p-8 mb-6 animate-pulse border-t-4 border-t-indigo-600">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Sparkles className="text-indigo-600 w-6 h-6 mr-2" /> Smart Generation Complete
                  </h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center shadow shadow-green-200">
                    <Download className="w-4 h-4 mr-2" /> Download PDF Exam
                  </button>
                </div>
                
                <div className="space-y-6">
                   <div className="p-4 bg-gray-50 border rounded-xl">
                      <p className="font-bold text-gray-800">1. What is the powerhouse of the cell?</p>
                      <div className="ml-4 mt-2 space-y-2 text-gray-600">
                        <p>A) Nucleus</p>
                        <p className="font-bold text-green-700">B) Mitochondria (Correct)</p>
                        <p>C) Ribosome</p>
                        <p>D) Cytoplasm</p>
                      </div>
                   </div>
                   <div className="p-4 bg-gray-50 border rounded-xl">
                      <p className="font-bold text-gray-800">2. Which process is used by plants to make food?</p>
                      <div className="ml-4 mt-2 space-y-2 text-gray-600">
                        <p className="font-bold text-green-700">A) Photosynthesis (Correct)</p>
                        <p>B) Respiration</p>
                        <p>C) Transpiration</p>
                        <p>D) Digestion</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Papers</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Algebra Midterm Form A', subject: 'Mathematics', questions: 25, marks: 50, diff: 'Medium', date: 'Oct 15' },
                  { title: 'WW2 Comprehensive Test', subject: 'History', questions: 30, marks: 100, diff: 'Hard', date: 'Oct 10' }
                ].map((paper, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-sm bg-gray-50 group">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{paper.title}</h3>
                        <div className="flex text-sm text-gray-500 mt-1">
                          <span>{paper.subject} • {paper.questions} Qs / {paper.marks} Marks • {paper.diff}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Generation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Quick Generator</h3>
              </div>
              
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Textbook Reference (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">Upload Chapter PDF to extract topics</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chapter or Topic Name</label>
                  <input type="text" placeholder="e.g. Cell Structure" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                       <option>MCQ (1 Mark)</option>
                       <option>Short (2 Marks)</option>
                       <option>Long (5 Marks)</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 shadow-md transition-colors mt-4"
                >
                  {generating ? 'Quiz Agent Analyzing...' : 'Generate AI Question Paper'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
