"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import CommentSection from "@/_components/CommentSection"
import ShareAndDownloadButtons from "@/_components/ShareAndDownloadBtns"
import SimilarBlogsSection from "@/_components/SimilarBlogsSection"
import { useBlogs } from "@/context/blogContext"

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  console.log(params)
  const resolvedParams = React.use(params)
  console.log(resolvedParams)
  const { blogs, isLoading, error } = useBlogs()
  const blogTitle = decodeURIComponent(resolvedParams.slug)

  const blog = blogs.find((blog) => blog.title === blogTitle)

  const sortedLatestBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.date_of_publishing).getTime() -
      new Date(a.date_of_publishing).getTime()
  )

  const blogPdf = blog?.title.split(" ")[0].toLowerCase()
  console.log(blogPdf)

  if (!blog) return notFound()

  return (
    <div className="p-10">
      <div className=" mx-auto">
        <h1 className="text-[#101828] text-center text-[40px] mb-3">
          {blog.title}
        </h1>
        <p className="text-gray-600 text-center text-[20px] mb-3">
          {blog.description}
        </p>
        <p className="text-center mb-3">{blog.author}</p>
        <Image
          src={`https://ut-dallas-5poh.onrender.com${blog.thumbnail.formats.large.url}`}
          width={1201}
          height={300}
          alt="blog-image"
          className="mx-auto"
        />
        <div className="flex md:flex-row flex-col gap-14 md:mt-[100px] mt-2.5">
          <div className="flex flex-col gap-5">
            <p className="flex-1 md:text-[18px] text-[13px]">{blog.content}</p>
            <div className="flex justify-between items-center">
              <div className="flex-1 hidden md:flex">
                <Image
                  src="/arrow-left-line.svg"
                  alt="arrow-left-line"
                  width={24}
                  height={24}
                />
                <Link href="/blogs" className="text-[20px] text-[#1D2A49]">
                  Back to Home
                </Link>
              </div>
              <ShareAndDownloadButtons pdfUrl={`/blogpdfs/${blogPdf}.pdf`} />
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <h1 className="text-[#1D2A49] text-[24px] md:text-[36px] font-medium">
              Latest Blogs
            </h1>
            {sortedLatestBlogs?.slice(0, 2).map((blog, index) => (
              <div
                key={index}
                className="rounded-[10px] p-2 md:p-5 mt-2 border md:h-[225px] md:w-[461px] border-[rgba(68,98,169,0.2)] shadow-[0_4px_20px_0_rgba(153,86,236,0.08)]"
              >
                <p className="md:py-[12px] md:px-[16px] py-[9px] px-[12px] mb-[12px] text-left rounded-[4px] bg-[rgba(68,98,169,0.1)] inline-flex">
                  {blog.title}
                </p>
                <p className="text-[#1D2A49] text-[12px] md:text-[12px] font-semibold">
                  {blog.description}
                </p>
                <Link
                  href={`/blogs/${encodeURIComponent(blog.title)}`}
                  className="flex "
                >
                  <p className="md:text-[16px] mt-[8px] text-[12px]">
                    Read more
                  </p>
                  <Image
                    src="/arrow-right-up.svg"
                    alt="arrow-right-up"
                    height={18}
                    width={18}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SimilarBlogsSection activeBlog={blog.documentId} />
      <CommentSection blogId={blog.documentId} />
    </div>
  )
}
