"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useBlogs } from "@/context/blogContext"

interface SimilarBlogsSectionProps {
  activeBlog?: string
}

export default function SimilarBlogsSection({
  activeBlog,
}: SimilarBlogsSectionProps) {
  const { blogs, isLoading, error } = useBlogs()
  const [active, setActive] = useState("All")
  const blogCategories = ["All", "Research", "Rankings", "News"]

  const filteredBlogs = blogs.filter((b) => {
    if (b.documentId === active) return false
    if (active === "All") return true
    return b.tags.toLowerCase()?.includes(active.toLowerCase())
  })

  return (
    <div className="mt-[50px] md:p-10 lg:px-[100px] md:px-[50px] px-6">
      <h1 className="text-[#1D2A49] text-[18px] md:text-[28px] font-semibold mb-[30px]">
        Similar Blogs
      </h1>
      {blogCategories.map((category, index) => {
        const isActive = category === active
        return (
          <button
            key={index}
            onClick={() => setActive(category)}
            className={`${isActive ? "bg-[#3B3098] text-white" : ""} cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-2  hover:border-[#3B3098] border-2  border-[#D1D5DC] rounded-[45.75px] text-[10px] md:text-[12.3px] text-[#4A5565] py-[9px] px-[19px] md:py-[13px] md:px-[36px] mr-2 mt-2`}
          >
            {category}
          </button>
        )
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[70px] ">
        {isLoading ? (
          <p className="text-center col-span-full text-gray-500 text-[16px] md:text-[18px]">
            Loading similar blogs...
          </p>
        ) : filteredBlogs?.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-[16px] md:text-[18px]">
            No blogs in this category available.
          </p>
        ) : (
          filteredBlogs
            ?.filter((b) => b.documentId !== activeBlog)
            ?.map((blog, index) => (
              <Link
                href={`/blogs/${encodeURIComponent(blog.title)}`}
                key={index}
                className="rounded-[10px] border mb-5 border-[rgba(68,98,169,0.2)] bg-white shadow-[0_4px_20px_0_rgba(153,86,236,0.08)] transform transition-all duration-300 ease-in-out grayscale hover:grayscale-0 hover:scale-105"
              >
                <img
                  src={blog?.thumbnail?.formats?.medium?.url}
                  alt="featured-img"
                  className="w-full h-auto col-span-1 max-h-[200px] rounded-sm"
                />

                <div className="p-5">
                  <div className="col-span-1">
                    <p className="font-semibold md:py-3 md:px-4 py-2.5 px-[15px] text-left rounded-sm text-[14px] bg-[rgba(68,98,169,0.1)] block md:min-h-[100px] w-full mb-2.5">
                      {blog.title}
                    </p>
                  </div>

                  <div className="flex justify-between mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/Publications_logo.png"
                        alt="publications-logo"
                        width={12}
                        height={12}
                      />
                      <p className="md:text-[12px] text-[12px]">
                        {blog.date_of_publishing}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="md:text-[12px] text-[12px]">
                        {blog.timeToRead} mins read
                      </p>
                    </div>
                  </div>

                  <p className="mt-2.5 text-[10px] md:text-[14px] text-[#1D2A49] font-medium">
                    {blog.description}
                  </p>
                </div>
              </Link>
            ))
        )}
      </div>
    </div>
  )
}
