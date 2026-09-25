export async function GET() {
  return Response.json({
    ok: true,
    service: "nuli-web",
    timestamp: new Date().toISOString()
  });
}
