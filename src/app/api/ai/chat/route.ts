import { NextRequest, NextResponse } from 'next/server';
import { queryPortfolioAI } from '@/ai/portfolioEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, previousContext } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Process through grounded portfolio knowledge engine
    const aiResponse = queryPortfolioAI(message, previousContext);

    return NextResponse.json(aiResponse);
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      {
        answer: 'I am currently operating in offline resilient mode. You can ask me about projects, skills, or navigation.',
        suggestedFollowUps: ['Show projects', 'Show skills', 'Explore resume'],
      },
      { status: 200 }
    );
  }
}
