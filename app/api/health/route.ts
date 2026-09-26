export async function GET() {
  return Response.json({
    ok: true,
    service: "torvya-web",
    timestamp: new Date().toISOString()
  });
}
