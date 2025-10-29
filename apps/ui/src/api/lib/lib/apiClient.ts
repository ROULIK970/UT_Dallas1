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

// Detect environment
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL

// Detect if we’re in build phase (no server yet)
const isBuildTime = typeof window === "undefined" && !vercelUrl

// Only use proxy at runtime (NOT build)
const useProxy = vercelEnv && vercelUrl && !isBuildTime

const strapiBase =
  process.env.NEXT_PUBLIC_API_BASE_PATH?.replace(/\/$/, "") ||
  "http://72.60.102.12:1337"

export const apiClient = axios.create({
  baseURL: useProxy ? "/api/proxy?path=" : `${strapiBase}/api/`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

// 🧠 Debug log
apiClient.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`
  console.log("🛰 Fetching:", fullUrl)
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const base = error.config?.baseURL ?? ""
    const url = error.config?.url ?? ""
    console.error("🚨 Axios Error URL:", `${base}${url}`)
    throw error
  }
)

export const basePath = strapiBase
