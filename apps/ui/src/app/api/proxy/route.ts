export async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const strapiBase =
    process.env.NEXT_PUBLIC_API_BASE_PATH || "http://72.60.102.12:1337"

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

    console.log("[] Proxy request to:", apiUrl)
    console.log("[] Strapi base:", strapiBase)

    const res = await fetch(apiUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    console.log("[] Strapi response status:", res.status)

    const data = await res.json()

    if (!res.ok) {
      console.error(" Strapi error response:", data)
      return Response.json(
        {
          error: "Failed to fetch from Strapi",
          details: data,
          status: res.status,
        },
        { status: res.status }
      )
    }

    return Response.json(data)
  } catch (error: any) {
    console.error(" Proxy error:", error.message)
    console.error(" Error details:", error)

    return Response.json(
      {
        error: "Failed to fetch from Strapi",
        message: error.message,
        details: error.toString(),
      },
      { status: 500 }
    )
  }
}

// Explicitly export for all methods (Next.js App Router requirement)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
