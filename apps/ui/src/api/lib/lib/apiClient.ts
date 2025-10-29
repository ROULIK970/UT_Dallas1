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
const isBuildTime = typeof window === "undefined" && !vercelUrl
const useProxy = vercelEnv && !isBuildTime

const strapiBase =
  process.env.NEXT_PUBLIC_API_BASE_PATH?.replace(/\/$/, "") ||
  "http://72.60.102.12:1337"

export const apiClient = axios.create({
  baseURL: useProxy ? "/api/proxy?path=" : `${strapiBase}/api/`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

// Debug: log URLs during build
apiClient.interceptors.request.use((config) => {
  console.log("🛰 Fetching:", `${config.baseURL ?? ""}${config.url ?? ""}`)
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "🚨 Axios Error URL:",
      error.config?.baseURL + error.config?.url
    )
    throw error
  }
)
