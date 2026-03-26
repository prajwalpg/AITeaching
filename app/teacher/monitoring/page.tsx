import { Navigation } from '@/components/navigation'
import { Users, Activity, Target, TrendingUp, Search, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/teacher/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Monitoring</h1>
            <p className="text-gray-500 mt-1">Track classroom engagement, assignment completion, and AI doubt-solving metrics.</p>
          </div>
          <div className="flex space-x-3">
             <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all font-semibold flex items-center shadow-sm">
              <Download className="w-5 h-5 mr-2" /> 
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">42</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Active Students Today</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
               <span className="flex items-center text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">128</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Doubts Answered by AI</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
               <span className="flex items-center text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">-2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">84%</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Assignment Completion</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">76%</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Average Quiz Score</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent AI Doubt Logs */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent AI Doubts Addressed</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                 <div className="flex justify-between items-start">
                   <h4 className="font-semibold text-gray-900 text-sm">"How does photosynthesis relate to the mitochondria?"</h4>
                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">2m ago</span>
                 </div>
                 <p className="text-sm text-gray-600 mt-1 line-clamp-1"><span className="font-semibold text-indigo-600">AI Response:</span> Based on your teacher's Cell Biology notes, photosynthesis occurs in the chloroplasts, while the mitochondria handles cellular respiration...</p>
                 <div className="mt-2 text-xs text-gray-500 flex items-center space-x-3">
                   <span className="flex items-center"><Users className="w-3 h-3 mr-1"/> Emma Wilson</span>
                   <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-sm">Successfully Answered via K-Base</span>
                 </div>
              </div>

               <div className="border-l-4 border-yellow-500 pl-4 py-2">
                 <div className="flex justify-between items-start">
                   <h4 className="font-semibold text-gray-900 text-sm">"Did Newton invent gravity?"</h4>
                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">15m ago</span>
                 </div>
                 <p className="text-sm text-gray-600 mt-1 line-clamp-1"><span className="font-semibold text-indigo-600">AI Response:</span> Consult your teacher. (Topic outside of current K-Base approved limits)</p>
                 <div className="mt-2 text-xs text-gray-500 flex items-center space-x-3">
                   <span className="flex items-center"><Users className="w-3 h-3 mr-1"/> Alex Kumar</span>
                   <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-0.5 rounded-sm">Referred to Teacher</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Top Students / Leaderboard */}
           <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Class Engagement</h2>
            <div className="space-y-4">
              {[
                { name: 'Emma Wilson', score: 98, trend: 'up' },
                { name: 'David Lee', score: 92, trend: 'up' },
                { name: 'Sophia Chen', score: 88, trend: 'stable' },
                { name: 'Alex Kumar', score: 76, trend: 'down' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs">{s.name.charAt(0)}</div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{s.name}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-700">{s.score}%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View Full Roster</button>
          </div>
        </div>

      </main>
    </div>
  )
}
