// export async function handler(req: Request) {
//   const url = "https://ut-dallas1-ui.vercel.app"

//   const { searchParams } = new URL(url)

//   const strapiBase =
//     process.env.NEXT_PUBLIC_API_BASE_PATH || "http://72.60.102.12:1337"

//   const path = searchParams.get("path")

//   if (!path) {
//     return Response.json(
//       { error: "Missing 'path' query parameter" },
//       { status: 400 }
//     )
//   }

//   try {
//     const cleanedPath = path.replace(/^\/+/, "").replace(/^api\/+/, "")
//     const apiUrl = `${strapiBase.replace(/\/$/, "")}/api/${cleanedPath}`

//     console.log(" Proxy request to:", apiUrl)
//     console.log(" Strapi base:", strapiBase)

//     if (strapiBase === "http://72.60.102.12:1337") {
//       console.warn(
//         " WARNING: Using default Strapi IP (Hostinger). If this fails, check:"
//       )
//       console.warn(
//         "   1. Hostinger firewall settings - may be blocking Vercel IPs"
//       )
//       console.warn("   2. Strapi server status on Hostinger")
//       console.warn(
//         "   3. Set STRAPI_URL env var if you have a different production URL"
//       )
//     }

//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//       "User-Agent": "Next.js-Proxy/1.0",
//     }

//     // Forward authorization header if present
//     const authHeader = req.headers.get("authorization")
//     if (authHeader) {
//       headers["authorization"] = authHeader
//     }

//     const res = await fetch(apiUrl, {
//       method: req.method,
//       headers,
//       cache: "no-store",
//       signal: AbortSignal.timeout(30000),
//     })

//     console.log(" Strapi response status:", res.status)
//     console.log(
//       " Strapi response headers:",
//       Object.fromEntries(res.headers.entries())
//     )

//     const contentType = res.headers.get("content-type")
//     let data

//     try {
//       data = contentType?.includes("application/json")
//         ? await res.json()
//         : await res.text()
//     } catch (parseError) {
//       console.error(" Failed to parse response body:", parseError)
//       data = { raw: "Response body could not be parsed" }
//     }

//     if (!res.ok) {
//       console.error(" Strapi error response:", data)
//       console.error(" Full error - Status:", res.status, "URL:", apiUrl)
//       return Response.json(
//         {
//           error: "Failed to fetch from Strapi",
//           details: data,
//           status: res.status,
//           url: apiUrl,
//         },
//         { status: res.status }
//       )
//     }

//     return Response.json(data)
//   } catch (error: any) {
//     console.error(" Proxy error:", error.message)
//     console.error(" Error stack:", error.stack)
//     console.error(" Full error object:", error)

//     let helpMessage = error.message
//     if (error.message.includes("ECONNREFUSED")) {
//       helpMessage =
//         "Connection refused - Strapi server may be down or unreachable from Vercel"
//     } else if (
//       error.message.includes("ETIMEDOUT") ||
//       error.message.includes("timeout")
//     ) {
//       helpMessage =
//         "Connection timeout - Hostinger server is not responding. Check firewall settings."
//     } else if (
//       error.message.includes("ENOTFOUND") ||
//       error.message.includes("getaddrinfo")
//     ) {
//       helpMessage =
//         "DNS resolution failed - Cannot reach the Strapi server address"
//     } else if (error.message.includes("ERR_HTTP_REQUEST_TIMEOUT")) {
//       helpMessage =
//         "Request timeout - Hostinger server took too long to respond"
//     }

//     return Response.json(
//       {
//         error: "Failed to fetch from Strapi",
//         message: helpMessage,
//         details: error.toString(),
//         timestamp: new Date().toISOString(),
//       },
//       { status: 500 }
//     )
//   }
// }

// // Explicitly export for all methods (Next.js App Router requirement)
// export { handler as GET, handler as POST, handler as PUT, handler as DELETE }

export async function handler(req: Request) {
  // ✅ Hardcode your Strapi path
  const { searchParams } = new URL(req.url)
  const rawPath = searchParams.get("path")
  console.log("raw path", rawPath)

  if (!rawPath) {
    return Response.json(
      { error: "Missing 'path' query parameter" },
      { status: 400 }
    )
  }

  const decodedPath = decodeURIComponent(rawPath)
  const strapiBase =
    process.env.NEXT_PUBLIC_API_BASE_PATH || "http://72.60.102.12:1337"

  // const path = "/api/blogs?populate=*"
  const apiUrl = `${strapiBase}/${decodedPath.replace(/^\/+/, "")}`

  console.log("Proxying request to:", apiUrl)

  console.log(" Proxy request to:", apiUrl)

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "User-Agent": "Next.js-Proxy/1.0",
    }

    const authHeader = req.headers.get("authorization")
    if (authHeader) headers["authorization"] = authHeader

    const res = await fetch(apiUrl, {
      method: req.method,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    })

    const contentType = res.headers.get("content-type")
    const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text()

    if (!res.ok) {
      console.error(" Strapi error response:", data)
      return Response.json(
        { error: "Failed to fetch from Strapi", details: data },
        { status: res.status }
      )
    }

    return Response.json(data)
  } catch (error: any) {
    console.error(" Proxy error:", error)
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

// Next.js App Router exports
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
