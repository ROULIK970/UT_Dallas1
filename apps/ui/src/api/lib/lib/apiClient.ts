import axios from "axios"

const isVercel = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV

export const apiClient = axios.create({
  baseURL: isVercel
    ? "/api/proxy?path=" // Calls internal Next.js route on production
    : (
        process.env.NEXT_PUBLIC_API_BASE_PATH || "http://localhost:1337"
      ).replace(/\/$/, "") + "/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

export const basePath =
  process.env.NEXT_PUBLIC_API_BASE_PATH || "http://localhost:1337"
