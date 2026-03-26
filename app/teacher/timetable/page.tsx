'use client'

import { Navigation } from '@/components/navigation'
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, MapPin, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function TimetablePage() {
  const [view, setView] = useState('week')
  const [filling, setFilling] = useState(false)
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const hours = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM']

  const handleAutoFill = () => {
     setFilling(true)
     setTimeout(() => setFilling(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/teacher/dashboard" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Syllabus Timetable</h1>
            <p className="text-gray-500 mt-1">AI-divided curriculum schedule for daily objectives.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white shadow-sm border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setView('week')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md shadow-sm transition-colors ${view === 'week' ? 'bg-green-50 text-green-700' : 'text-gray-600'}`}>Week</button>
              <button 
                onClick={() => setView('month')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md shadow-sm transition-colors ${view === 'month' ? 'bg-green-50 text-green-700' : 'text-gray-600'}`}>Month</button>
            </div>
            
            <button onClick={handleAutoFill} disabled={filling} className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center shadow-md disabled:opacity-50">
              <Plus className={`w-4 h-4 mr-2 ${filling ? 'animate-spin' : ''}`} /> 
              <span>{filling ? 'Agent Distributing...' : 'Auto-Fill Schedule'}</span>
            </button>
          </div>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">{view === 'week' ? 'October 14 - October 18, 2026' : 'October 2026'}</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors">Today</button>
        </div>

        {view === 'month' ? (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[600px] flex items-center justify-center text-gray-400 font-bold border-dashed border-4 p-12 text-center text-xl">
               Month view actively synchronizing with Google Calendar and Microsoft Outlook for broader scheduling updates.
           </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
          <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50/80 sticky top-0 z-10 w-full">
            <div className="p-4 border-r border-gray-200 text-center flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            {days.map((day, i) => (
              <div key={day} className="p-4 border-r border-gray-200 last:border-r-0 text-center">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{day}</span>
                <div className={`mt-1 text-2xl ${i === 2 ? 'font-bold text-green-600 flex items-center justify-center' : 'font-medium text-gray-900'}`}>
                  {12 + i} {i === 2 && <span className="w-2 h-2 rounded-full bg-green-500 ml-2"></span>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto w-full">
            <div className="grid grid-cols-6 relative min-h-max">
              {/* Hours Column */}
              <div className="col-span-1 border-r border-gray-200 bg-gray-50/30">
                {hours.map((hour, i) => (
                  <div key={i} className="h-24 border-b border-gray-200 p-2 text-right relative">
                    <span className="text-xs font-medium text-gray-500 absolute -top-2.5 right-4 bg-gray-50/30 px-1">{hour}</span>
                  </div>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="col-span-1 border-r border-gray-200 relative">
                <div className="h-[95px] absolute top-8 left-2 right-2 bg-blue-50 border border-blue-200 rounded-lg shadow-sm border-l-4 border-l-blue-500 p-3 hover:shadow-md transition-shadow cursor-pointer z-10">
                  <h4 className="font-bold text-gray-900 text-sm">Algebra Fundamentals</h4>
                  <p className="text-xs text-gray-600 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Room 101</p>
                </div>
              </div>
              <div className="col-span-1 border-r border-gray-200 relative">
                 <div className="h-[95px] absolute top-32 left-2 right-2 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm border-l-4 border-l-yellow-500 p-3 hover:shadow-md transition-shadow cursor-pointer z-10">
                  <h4 className="font-bold text-gray-900 text-sm">WW2 Seminar</h4>
                  <p className="text-xs text-gray-600 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Auditorium</p>
                </div>
              </div>
              <div className="col-span-1 border-r border-gray-200 relative bg-green-50/20">
                <div className="h-[95px] absolute top-[200px] left-2 right-2 bg-green-50 border border-green-200 rounded-lg shadow-sm border-l-4 border-l-green-600 p-3 hover:shadow-md transition-shadow cursor-pointer z-10 ring-2 ring-green-600 ring-offset-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 text-sm">Cell Biology Lab</h4>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Sci-Lab B</p>
                  <div className="mt-2 text-xs font-semibold text-green-700 bg-green-200/50 inline-block px-2 py-0.5 rounded">In Progress</div>
                </div>
              </div>
              <div className="col-span-1 border-r border-gray-200 relative"></div>
              <div className="col-span-1 relative">
                <div className="h-[95px] absolute top-8 left-2 right-2 bg-purple-50 border border-purple-200 rounded-lg shadow-sm border-l-4 border-l-purple-500 p-3 hover:shadow-md transition-shadow cursor-pointer z-10">
                  <h4 className="font-bold text-gray-900 text-sm">Physics Overview</h4>
                  <p className="text-xs text-gray-600 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> Room 104</p>
                </div>
              </div>

              {/* Background horizontal lines to simulate rows */}
              <div className="absolute inset-0 z-0 pointer-events-none w-full ml-[16.666%]">
                {hours.map((_, i) => (
                  <div key={i} className="h-24 border-b border-gray-200 w-[83.333%] border-dashed"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  )
}
