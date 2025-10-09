export async function GET() {
  return Response.json({
    nextauth_url: process.env.NEXTAUTH_URL,
    has_secret: !!process.env.NEXTAUTH_SECRET,
    has_google_id: !!process.env.GOOGLE_CLIENT_ID,
    env_keys: Object.keys(process.env).filter(key => key.includes('NEXTAUTH') || key.includes('GOOGLE'))
  })
}