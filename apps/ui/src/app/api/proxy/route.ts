export async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const rawPath = searchParams.get("path")
  console.log("raw path:", rawPath)

  if (!rawPath) {
    return Response.json(
      { error: "Missing 'path' query parameter" },
      { status: 400 }
    )
  }

  const decodedPath = decodeURIComponent(rawPath)
  const strapiBase =
    process.env.NEXT_PUBLIC_API_BASE_PATH || "http://72.60.102.12:1337"

  const apiUrl = `${strapiBase}/${decodedPath.replace(/^\/+/, "")}`
  console.log("Proxying request to:", apiUrl)

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "User-Agent": "Next.js-Proxy/1.0",
    }

    const authHeader = req.headers.get("authorization")
    if (authHeader) headers["authorization"] = authHeader

    // ✅ Read and forward request body (for POST/PUT/DELETE)
    let body: string | undefined = undefined
    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        body = await req.text()
      } catch (err) {
        console.error("Failed to read request body:", err)
      }
    }

    const res = await fetch(apiUrl, {
      method: req.method,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
      ...(body ? { body } : {}), // forward JSON payload if present
    })

    const contentType = res.headers.get("content-type")
    const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text()

    if (!res.ok) {
      console.error("Strapi error response:", data)
      return Response.json(
        { error: "Failed to fetch from Strapi", details: data },
        { status: res.status }
      )
    }

    return Response.json(data)
  } catch (error: any) {
    console.error("Proxy error:", error)
    return Response.json(
      {
        error: "Failed to fetch from Strapi",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
