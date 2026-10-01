import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const res = await fetch(url);
    const blob = await res.blob();
    
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'video/mp4',
        'Content-Disposition': 'attachment; filename="cinema_render_export.mp4"',
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse('Failed to fetch video', { status: 500 });
  }
}
