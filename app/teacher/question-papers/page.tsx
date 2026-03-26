import { Navigation } from '@/components/navigation'
import { FileText, Sparkles, Settings, Download, Search } from 'lucide-react'

export default function QuestionPapersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Question Papers</h1>
            <p className="text-gray-600 mt-2">Auto-generate exams and quizzes from your approved Knowledge Base.</p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 font-semibold">
            <Sparkles className="h-5 w-5" />
            <span>Generate with AI</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content - Generated Papers */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Papers</h2>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Algebra Midterm Form A', subject: 'Mathematics', questions: 25, marks: 50, diff: 'Medium', date: 'Oct 15' },
                  { title: 'Cell Biology Quiz', subject: 'Biology', questions: 10, marks: 10, diff: 'Easy', date: 'Oct 12' },
                  { title: 'WW2 Comprehensive Test', subject: 'History', questions: 30, marks: 100, diff: 'Hard', date: 'Oct 10' }
                ].map((paper, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all bg-gray-50/50 group">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{paper.title}</h3>
                        <div className="flex space-x-3 text-sm text-gray-500 mt-1">
                          <span className="font-medium">{paper.subject}</span>
                          <span>• {paper.questions} Qs / {paper.marks} Marks</span>
                          <span>• {paper.diff}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Biology</option>
                    <option>History</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics (Knowledge Base)</label>
                  <div className="border border-gray-300 rounded-lg p-3 space-y-2 h-32 overflow-y-auto bg-gray-50">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="text-sm">Introduction to Algebra</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm">Linear Equations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm">Quadratic Formula</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                      <option>Mixed</option>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
                    <input type="number" defaultValue={20} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 shadow-md transition-colors mt-4">
                  Generate Exam Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
