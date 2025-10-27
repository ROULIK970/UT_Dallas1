"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Blog, searchBlogs } from "@/api/services/blogs.service"

export default function Searchbar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Blog[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!debouncedQuery.trim()) {
        setResults([])
        return
      }
      try {
        const blogs = await searchBlogs(debouncedQuery)
        setResults(blogs)
      } catch (err) {
        console.error("Search error:", err)
        setResults([])
      }
    }

    fetchBlogs()
  }, [debouncedQuery])

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search blogs..."
        className="w-full text-white placeholder-white rounded bg-gray-700 p-4"
      />

      {results.length > 0 && (
        <div className="absolute bg-white border-2 border-black mt-1 w-full z-50 max-h-64 overflow-y-auto rounded">
          {results.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${encodeURIComponent(blog.title)}`}
              onClick={() => {
                setQuery("")
                setResults([])
              }}
              className="block text-black px-4 py-2 hover:bg-gray-100"
            >
              {blog.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
