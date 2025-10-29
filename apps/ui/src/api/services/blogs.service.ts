import { apiClient } from "../lib/lib/apiClient"

export interface Blog {
  id: number
  documentId: string
  title: string
  content: string
  author: string
  description: string
  tags: string
  timeToRead: number
  date_of_publishing: string
  thumbnail: any
  banner: any
  authorLogoAvatar: any
  comments: any[]
  featured?: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

///api/proxy?path=
//blogs?filters[title][$containsi]=${searchQuery}&populate=*

export const searchBlogs = async (searchQuery = ""): Promise<Blog[]> => {
  try {
    const res = await apiClient.get(
      `blogs?filters[title][$containsi]=${searchQuery}&populate=*`
    )
    return res.data.data
  } catch (error: any) {
    console.error(
      "Error fetching blogs:",
      error.response?.data || error.message
    )
    throw new Error(error.message || "Failed to fetch blogs")
  }
}

// export const getFeaturedBlogs = async (): Promise<Blog[]> => {
//   try {
//     const res = await apiClient.get(
//       `blogs?populate=*&filters[featured][$eq]=true`
//     )

//     return res.data.data
//   } catch (error: any) {
//     console.error(
//       "Error fetching featured blogs:",
//       error.response?.data || error.message
//     )
//     throw new Error(error.message || "Failed to fetch featured blogs")
//   }
// }
export const getFeaturedBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await apiClient.get(
      // no leading slash!
      `blogs?populate=*&filters[featured][$eq]=true`
    )
    return res.data.data
  } catch (error: any) {
    console.error("Error fetching featured blogs:", error.message)
    throw new Error(error.message || "Failed to fetch featured blogs")
  }
}
