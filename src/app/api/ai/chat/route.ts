import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/lib/ai/vectorStore';
import { routeMultiAgentConversation } from '@/lib/ai/agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.message || body.prompt;

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid message string in the request body.',
        },
        { status: 400 }
      );
    }

    // 1. Perform Semantic Search on Vector Store & check Live Search Trigger
    const { matches, searchTriggered, contextText } = await searchKnowledgeBase(userMessage);

    // 2. Route multi-agent orchestration (Reception vs Specialist) & auto-create lead if contact detected
    const agentResponse = await routeMultiAgentConversation(
      userMessage,
      contextText,
      searchTriggered
    );

    // 3. Return structured response with guardrail disclaimer and lead tracking
    return NextResponse.json({
      success: true,
      agent: agentResponse.agent,
      reply: agentResponse.reply,
      disclaimer: agentResponse.disclaimer,
      leadCreated: agentResponse.leadCreated,
      sourcesUsed: agentResponse.sourcesUsed || ['Supabase Vector Store (knowledge_base)'],
      searchTriggered: agentResponse.searchTriggered,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat handler:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal AI Server Error processing query.',
      },
      { status: 500 }
    );
  }
}
