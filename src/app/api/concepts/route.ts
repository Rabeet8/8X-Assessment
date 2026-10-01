import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.audience || !body.goal || !body.product) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const concepts = [
      {
        id: 'c1', title: 'The 7AM Ritual', tone: 'Tactile and intimate',
        summary: `A lifestyle-oriented morning narrative for ${body.product.name}, targeting ${body.audience} to ${body.goal}.`,
        hook: 'Start your morning right.', color: '#ffb3ba', score: 92
      },
      {
        id: 'c2', title: 'Proof in Motion', tone: 'Kinetic and precise',
        summary: `A demonstration and transformation narrative for ${body.product.name}, perfect for ${body.audience}.`,
        hook: 'See it in action.', color: '#bae1ff', score: 88
      },
      {
        id: 'c3', title: 'Quiet Signal', tone: 'Minimal and assured',
        summary: `A premium, understated positioning for ${body.product.name} aiming to ${body.goal}.`,
        hook: 'Less is more.', color: '#baffc9', score: 95
      }
    ];

    return NextResponse.json({ concepts });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
