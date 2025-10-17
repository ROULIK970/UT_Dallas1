"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import staticData from "@/data/staticData.json"

export default function SimilarBlogsSection() {
  const [active, setActive] = useState("All")
  const getBlogsInfo = staticData.blogs.similarBlogs

  const blogCategories = ["All", "Research", "Rankings", "News"]

  return (
    <div className="mt-[50px]">
      <h1 className="text-[#1D2A49] text-[18px] md:text-[28px] font-[600] mb-[30px]">
        Similar Blogs
      </h1>
      {blogCategories.map((category, index) => {
        const isActive = category === active
        return (
          <button
            key={index}
            onClick={() => setActive(category)}
            className={`${isActive ? "bg-[#3B3098] text-white" : ""} cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-2  hover:border-purple-600 border-2  border-[#D1D5DC] rounded-[45.75px] text-[18px] md:text-[12.3px] text-[#4A5565] py-[9px] px-[19px] md:py-[13px] md:px-[36px] mr-2 mt-2`}
          >
            {category}
          </button>
        )
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[70px]">
        {getBlogsInfo.map((blog, index) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={index}
            className="rounded-[10px] border mb-[20px] border-[rgba(68,98,169,0.2)] bg-white shadow-[0_4px_20px_0_rgba(153,86,236,0.08)] transform transition-all duration-300 ease-in-out grayscale hover:grayscale-0 hover:scale-105"
          >
            <img
              src={blog.img}
              alt="featured-img"
              className="w-full h-auto col-span-1"
            />

            <div className="p-5">
              <div className="col-span-1">
                <p className="font-semibold md:py-[12px] md:px-[16px] py-[10px] px-[15px] text-left rounded-[4px] bg-[rgba(68,98,169,0.1)] inline-flex">
                  {blog.title}
                </p>
              </div>

              <div className="flex text-[16px] justify-between mt-[10px]">
                <div className="flex items-center gap-1.5 ">
                  <Image
                    src="/Publications_logo.png"
                    alt="publications-logo"
                    width={16}
                    height={16}
                  />
                  <p className="md:text-[16px] text-[12px]">
                    {blog.publishedAt}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>.</span>
                  <p className="md:text-[16px] text-[12px]">{blog.readTime}</p>
                </div>
              </div>

              <p className="mt-[10px] text-[10px] md:text-[20px] text-[#1D2A49] font-medium">
                {blog.blogDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
