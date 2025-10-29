// import axios from "axios"

// const isVercel = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV

// export const apiClient = axios.create({
//   baseURL: isVercel
//     ? "/api/proxy?path=" // Calls internal Next.js route on production
//     : (
//         process.env.NEXT_PUBLIC_API_BASE_PATH || "http://localhost:1337"
//       ).replace(/\/$/, "") + "/api/",
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
// })

// export const basePath =
//   process.env.NEXT_PUBLIC_API_BASE_PATH || "http://localhost:1337"
import axios from "axios"

const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL

// Detect if we’re inside a build (no server to handle /api/proxy)
const isBuildTime = typeof window === "undefined" && !vercelUrl

// Use proxy only when the app is actually running on Vercel
const useProxy = vercelEnv && !isBuildTime

const strapiBase =
  process.env.NEXT_PUBLIC_API_BASE_PATH?.trim() || "http://72.60.102.12:1337"

export const apiClient = axios.create({
  baseURL: useProxy
    ? "/api/proxy?path="
    : `${strapiBase.replace(/\/$/, "")}/api/`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

export const basePath = strapiBase
