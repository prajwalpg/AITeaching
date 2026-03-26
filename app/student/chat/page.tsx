import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Navigation } from '@/components/navigation'
import { ChatInterface } from './_components/chat-interface'

export const dynamic = 'force-dynamic'

export default async function ChatPage({
  searchParams
}: {
  searchParams: { lessonId?: string }
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  const userRole = (session.user as any)?.role
  if (userRole === 'Teacher') {
    redirect('/teacher/dashboard')
  }

  const lessons = await prisma.lesson.findMany({
    include: {
      teacher: {
        select: {
          name: true
        }
      }
    },
    orderBy: { subject: 'asc' }
  })

  const preselectedLessonId = searchParams?.lessonId ?? null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">AI Tutor</h1>
          <p className="text-gray-600 mt-2">
            Ask questions about your lessons and get instant, personalized help
          </p>
        </div>

        <ChatInterface lessons={lessons} preselectedLessonId={preselectedLessonId} />
      </main>
    </div>
  )
}
