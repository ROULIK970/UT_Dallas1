export async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const strapiBase =
    process.env.NEXT_PUBLIC_API_BASE_PATH || "http://72.60.102.12:1337"

  // Required param → path=/api/blogs?populate=* (for example)
  const path = searchParams.get("path")

  if (!path) {
    return Response.json(
      { error: "Missing 'path' query parameter" },
      { status: 400 }
    )
  }

  try {
    const cleanedPath = path.replace(/^\/+/, "").replace(/^api\/+/, "")
    const apiUrl = `${strapiBase.replace(/\/$/, "")}/api/${cleanedPath}`

    const res = await fetch(apiUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch from Strapi" },
      { status: 500 }
    )
  }
}

// Explicitly export for all methods (Next.js App Router requirement)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
