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

// 🧩 Detect environment
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL

// 🏗️ Detect build time (no runtime URL yet)
const isBuildTime =
  typeof window === "undefined" &&
  (!vercelUrl || process.env.NEXT_PHASE === "phase-production-build")

// 🔄 Decide whether to use proxy
// Only use proxy during runtime on Vercel (when NEXT_PUBLIC_VERCEL_URL exists)
const useProxy = !!(vercelUrl && !isBuildTime)

const strapiBase =
  process.env.NEXT_PUBLIC_API_BASE_PATH?.replace(/\/$/, "") ||
  "http://72.60.102.12:1337"

const baseURL = useProxy
  ? "https://ut-dallas1-ui.vercel.app/api/proxy?path=api"
  : `${strapiBase}/api/`

console.log("🧠 [apiClient] Environment:", {
  vercelEnv,
  vercelUrl,
  isBuildTime,
  useProxy,
  baseURL,
})

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
})

apiClient.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`
  console.log("🛰 Fetching:", fullUrl)
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const fullUrl = `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`
    console.error("🚨 Axios Error URL:", fullUrl)
    throw error
  }
)

export const basePath = strapiBase
