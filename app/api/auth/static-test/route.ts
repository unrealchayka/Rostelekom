// app/api/auth/static-test/route.ts
export async function GET() {
  return Response.json({ message: 'Static auth route works' })
}