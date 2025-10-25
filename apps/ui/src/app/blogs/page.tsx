"use client"

import Image from "next/image"
import Link from "next/link"
import SimilarBlogsSection from "@/_components/SimilarBlogsSection"
import { useBlogs } from "@/context/blogContext"

export default function page() {
  const { featuredBlogs, blogs, isLoading, error } = useBlogs()

  return (
    <div className="mb-3 mt-2 md:px-14 px-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 mt-5">
          <Image
            src="/featured-article-logo.svg"
            alt="logo"
            height={10.6}
            width={21.2}
          />
          <h2 className="text-[16px] text-[#101828]">Featured Blog</h2>
        </div>

        {isLoading ? (
          <p>Loading featured blog...</p>
        ) : error ? (
          <p className="text-red-500">Error loading featured article</p>
        ) : featuredBlogs.length === 0 ? (
          <p>No featured blog available</p>
        ) : (
          featuredBlogs.map((blog) => (
            <div
              key={blog.documentId}
              className="rounded-[14px] border border-[rgba(0,0,0,0.06)] flex flex-col xl:flex-row p-2 md:p-10 gap-5 "
            >
              <Image
                src={`https://ut-dallas-5poh.onrender.com${blog.thumbnail.formats.large.url}`}
                alt="featured-img"
                width={695}
                height={725}
                className="flex-2 items-center max-h-[600px]"
              />
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex 2xl:gap-5 justify-around ">
                  <p className="rounded-[8.514px] border-[1.261px] border-[#00A648] bg-white text-[#00A648] text-[10px] md:text-[13.2px] px-[6px] py-[2px] md:py-[3.216px] md:px-[9.838px] flex-shrink-0">
                    {blog.tags.split(",")[1]}
                  </p>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/articleLogos/year-logo.svg"
                      alt="published-logo"
                      width={17.6}
                      height={10.6}
                    />
                    <p className="text-[10px] md:text-[15px]">
                      {blog.date_of_publishing}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/article-readingTime.svg"
                      alt="time-logo"
                      width={17.6}
                      height={17.6}
                    />
                    <p className="text-[10px] md:text-[15px]">
                      {blog.timeToRead} mins read
                    </p>
                  </div>
                </div>
                <h1 className="text-[#101828] text-[18px] md:text-[26.487px]">
                  {blog.title}
                </h1>
                <p className="text-[#4A5565] text-[14px] md:text-[18px]">
                  {blog.description}
                </p>
                <div className="flex gap-3">
                  <Image
                    src="/featured-blogs-author-logo.svg"
                    alt="blogs-logo"
                    width={44}
                    height={44}
                  />
                  <div>
                    <p className="text-[#101828] font-semibold text-[12px] md:text-[17px]">
                      {blog.author}
                    </p>
                  </div>
                </div>
                <div className="flex bg-[#3B3098] items-center cursor-pointer rounded-[11px]  py-[8.072px] px-[13.244px] transform transition-all duration-300 ease-in-out hover:scale-105 w-[147px] gap-[8.8px]">
                  <Link
                    href={`/blogs/${encodeURIComponent(blog.title)}`}
                    className="text-left text-white text-[12px] md:text-[15.5px] "
                  >
                    Read Article
                  </Link>
                  <div className="relative w-3 h-3 md:w-6 md:h-6">
                    <Image
                      src="/next-arrow.svg"
                      alt="next"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <SimilarBlogsSection />
    </div>
  )
}
