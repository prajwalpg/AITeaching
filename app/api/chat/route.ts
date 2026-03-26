import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { message, lessonId } = body

    if (!message || !lessonId) {
      return NextResponse.json(
        { error: 'Message and lesson ID are required' },
        { status: 400 }
      )
    }

    // Fetch the lesson content for RAG
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        teacher: {
          select: {
            name: true
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Construct RAG context with lesson content
    const systemPrompt = `You are Sahayak, an AI educational assistant that helps students learn based on their teacher's lesson materials. 

You have access to the following lesson:
Title: ${lesson?.title ?? ''}
Subject: ${lesson?.subject ?? ''}
Description: ${lesson?.description ?? ''}

Lesson Content:
${lesson?.content ?? ''}

Teacher: ${lesson?.teacher?.name ?? 'Unknown'}

Instructions:
- Answer the student's question using ONLY the information from the lesson content above
- If the question cannot be answered using the lesson content, politely explain that the question is outside the scope of the current lesson
- Be encouraging and educational in your responses
- Break down complex concepts into simpler explanations
- Provide examples when helpful
- Stay faithful to the teacher's instruction and materials`

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ]

    // Call LLM API with streaming
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('LLM API request failed')
    }

    // Stream the response back to client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            const chunk = decoder.decode(value)
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
