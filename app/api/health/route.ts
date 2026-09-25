export async function GET() {
  return Response.json({
    ok: true,
    service: "nooli-web",
    timestamp: new Date().toISOString()
  });
}
