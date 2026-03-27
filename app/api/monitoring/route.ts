import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

/**
 * Fetch Student Monitoring Dashboard Stats & Recent AI Doubts
 */

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Relaxed for demo user
    
    // 1. Fetch recent AI doubts
    const doubts = await prisma.doubt.findMany({
      include: {
        student: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    // 2. Fetch aggregate stats
    const totalDoubts = await prisma.doubt.count();
    const answeredByAI = await prisma.doubt.count({ where: { wasAnsweredByAI: true } });
    
    // We can filter active students (e.g. students who asked a doubt today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeStudentsToday = await prisma.doubt.groupBy({
      by: ['studentId'],
      where: { createdAt: { gte: today } }
    });

    return NextResponse.json({
      success: true,
      data: {
        doubts: doubts.map(d => ({
          id: d.id,
          question: d.question,
          answer: d.answer,
          studentName: d.student?.name || 'Unknown Student',
          wasAnsweredByAI: d.wasAnsweredByAI,
          createdAt: d.createdAt
        })),
        stats: {
          activeStudents: activeStudentsToday.length || 0,
          doubtsAnswered: totalDoubts,
          aiSolvedRate: totalDoubts > 0 ? Math.round((answeredByAI / totalDoubts) * 100) : 100
        }
      }
    });

  } catch (error: any) {
    console.error('Monitoring Fetch Error:', error);
    return NextResponse.json({ success: false, error: 'Internal system error fetching metrics' }, { status: 500 });
  }
}
