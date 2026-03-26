import { NextResponse } from 'next/server';
import { orchestrate } from '@/lib/agents/orchestrator';
import { saveMemory, getMemory } from '@/lib/agents/memory-agent';

export async function POST(req: Request) {
  try {
    const { message, userId, context } = await req.json();

    // 1. Fetch memory (context)
    const memory = await getMemory(userId);
    
    // 2. Combine frontend context with memory
    const fullContext = {
      ...context,
      history: memory
    };

    // 3. Let Orchestrator direct the agent workflow
    const orchestratorResult = await orchestrate(userId, message, fullContext);

    // 4. Save new action into memory
    await saveMemory(userId, { topic: message, agent: orchestratorResult.agentUsed });

    // 5. Build dynamic output matching specification
    return NextResponse.json({
      agentUsed: orchestratorResult.agentUsed,
      response: orchestratorResult.data,
      additionalData: {
        success: orchestratorResult.success,
        message: orchestratorResult.message
      }
    });
  } catch (error: any) {
    console.error("FATAL ERROR IN API CHAT:", error);
    return NextResponse.json(
      { agentUsed: "error", response: "Critical system error in Orchestrator.", additionalData: { error: error.message, stack: error.stack } },
      { status: 500 }
    );
  }
}
