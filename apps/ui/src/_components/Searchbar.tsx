"use client"

import { useState } from "react"
import Link from "next/link"
import { Blog, searchBlogs } from "@/api/services/blogs.service"

export default function Searchbar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Blog[]>([])

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === "") {
      setResults([])
      return
    }

    try {
      const blogs = await searchBlogs(value)
      setResults(blogs)
    } catch (err) {
      console.error("Search error:", err)
      setResults([])
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="🔍 Search blogs..."
        className="w-full text-white placeholder-white rounded bg-gray-700 p-4"
      />

      <div className="bg-white border-2 border-black mt-1 cursor-pointer z-50">
        {results.map((blog) => (
          <Link
            onClick={() => {
              setQuery("")
              setResults([])
            }}
            href={`/blogs/${encodeURIComponent(blog.title)}`}
            className="block text-black hover:bg-gray-100"
            key={blog.id}
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
