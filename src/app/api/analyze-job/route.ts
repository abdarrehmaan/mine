import { NextRequest, NextResponse } from 'next/server';
import { analyzeJobFit } from '@/ai/portfolioEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription } = body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 });
    }

    const result = analyzeJobFit(jobDescription);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Job Analysis Error:', error);
    return NextResponse.json({ error: 'Failed to analyze job description' }, { status: 500 });
  }
}
