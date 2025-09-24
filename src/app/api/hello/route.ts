// app/api/hello/route.ts
export async function GET() {
  return new Response(JSON.stringify({ name: 'Bambang' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// (optionally) you could also support POST etc.
