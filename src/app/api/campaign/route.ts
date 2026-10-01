import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.conceptId || !body.product) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const shots = [
      { id: 's1', type: 'Pattern interrupt', title: 'Attention Grabber', action: 'Introduces the product against a strong visual field', camera: 'Fast zoom in', duration: 2 },
      { id: 's2', type: 'Tension', title: 'The Problem', action: 'Presents the familiar customer problem', camera: 'Close, human-feeling', duration: 3 },
      { id: 's3', type: 'Reveal', title: 'The Answer', action: 'Positions the product as the answer', camera: 'Quick hero reveal', duration: 2 },
      { id: 's4', type: 'Proof', title: 'Texture & Benefit', action: 'Demonstrates product texture or behavior', camera: 'Quick match cuts', duration: 2 },
      { id: 's5', type: 'Payoff', title: 'Call to Action', action: 'Finishes with the product promise', camera: 'Stable hero shot', duration: 2 }
    ];

    const hooks = [
      `${body.product.name} fits perfectly into your routine.`,
      `Notice the premium feel of ${body.product.name}.`,
      `POV: You just upgraded your life with ${body.product.name}.`
    ];

    return NextResponse.json({ shots, hooks });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
