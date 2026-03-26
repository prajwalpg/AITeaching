import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { BookOpen, Plus, Edit, FileText, Calendar, Eye, Bell } from 'lucide-react'
import { DeleteLessonButton } from './_components/delete-lesson-button'

export const dynamic = 'force-dynamic'

export default async function TeacherDashboard() {
  // Mocked user for "Continue as Teacher" feature
  const userId = 'demo-teacher-id'
  
  let lessons: any[] = []
  try {
    lessons = await prisma.lesson.findMany({
      where: { teacherId: userId },
      orderBy: { createdAt: 'desc' }
    })
  } catch (e) {
    lessons = []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Teacher Control Center</h1>
            <p className="text-gray-600 mt-2">Manage everything your students see and learn</p>
          </div>
          <Link
            href="/teacher/lessons/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Generate New Content</span>
          </Link>
        </div>

        {/* Dashboard Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/teacher/knowledge-base" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-sm text-gray-500">View what students can ask the AI about</p>
          </Link>

          <Link href="/teacher/question-papers" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-indigo-100 flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Question Papers</h3>
            <p className="text-sm text-gray-500">Auto-generate exams from approved notes</p>
          </Link>

          <Link href="/teacher/timetable" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-green-100 flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Timetable</h3>
            <p className="text-sm text-gray-500">Divide syllabus into daily schedules</p>
          </Link>

          <Link href="/teacher/monitoring" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-purple-100 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Student Monitoring</h3>
            <p className="text-sm text-gray-500">Track views, doubts, and assignments</p>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Content Verification</h2>
        {lessons?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No content yet!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Upload curriculum or textbook to let the Multi-Agent System generate notes, key concepts, and worksheets for your approval.
            </p>
            <Link
              href="/teacher/lessons/new"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Generate Content</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons?.map((lesson: any) => (
              <div
                key={lesson?.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {lesson?.subject}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {lesson?.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lesson?.description}
                </p>
                
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/teacher/lessons/${lesson?.id}/edit`}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Review & Approve</span>
                  </Link>
                  <DeleteLessonButton lessonId={lesson?.id ?? ''} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
