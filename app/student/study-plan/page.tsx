import { Navigation } from '@/components/navigation'
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, BookOpen, ArrowLeft, Target, CheckCircle, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function StudyPlanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/student/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">"What should I study?"</h1>
            <p className="text-gray-500 mt-1">Your AI-generated daily learning plan based on the class timetable.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 border-l-4 border-l-blue-600">
               <div className="flex items-center space-x-3 mb-4">
                 <Target className="w-8 h-8 text-blue-600" />
                 <h2 className="text-2xl font-bold text-gray-900">Today's Priority</h2>
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">Algebra: Solving Linear Equations</h3>
               <p className="text-gray-600 mb-6">Your teacher scheduled this for today. You missed a concept from the notes yesterday, so we are emphasizing this topic.</p>
               
               <div className="flex space-x-4">
                 <a href="/student/chat" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-all flex items-center">
                   <BookOpen className="w-5 h-5 mr-2" /> Start Lesson
                 </a>
               </div>
             </div>

             <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Upcoming Schedule</h2>
             <div className="space-y-4">
               {[
                 { time: '10:00 AM', topic: 'Cell Biology Quiz', type: 'Assignment', status: 'Pending' },
                 { time: '02:00 PM', topic: 'Review World War II Timeline', type: 'Reading', status: 'Next' },
                 { time: 'Tomorrow', topic: "Newton's Laws Worksheet", type: 'Practice', status: 'Upcoming' },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-gray-300 transition-colors">
                   <div className="flex items-center space-x-4">
                     <span className="font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded w-28 text-center">{item.time}</span>
                     <div>
                       <h4 className="font-bold text-gray-900">{item.topic}</h4>
                       <span className="text-sm text-gray-500">{item.type}</span>
                     </div>
                   </div>
                   <span className={`text-sm font-semibold ${item.status === 'Next' ? 'text-blue-600' : 'text-gray-400'}`}>{item.status}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
               <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" /> Weekly Progress</h3>
               <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="text-green-600">12 / 16</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full w-3/4"></div>
                  </div>
               </div>
               <p className="text-sm text-gray-500">You are on track to finish your weekly syllabus! Keep it up before the Friday Quiz.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
