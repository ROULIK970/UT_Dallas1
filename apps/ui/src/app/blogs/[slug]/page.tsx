import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import CommentSection from "@/_components/CommentSection"
import ShareAndDownloadButtons from "@/_components/ShareAndDownloadBtns"
import SimilarBlogsSection from "@/_components/SimilarBlogsSection"
import { searchBlogs } from "@/api/services/blogs.service"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const blogs = await searchBlogs()

  console.log(resolvedParams)
  const blogTitle = decodeURIComponent(resolvedParams.slug)

  const blog = blogs?.find((blog) => blog?.title === blogTitle)

  const sortedLatestBlogs = [...blogs]?.sort(
    (a, b) =>
      new Date(b.date_of_publishing).getTime() -
      new Date(a.date_of_publishing).getTime()
  )

  const blogPdf = blog?.title?.split(" ")[0].toLowerCase()
  console.log(blog)

  if (!blog) return notFound()

  return (
    <div className="md:p-10">
      <div className="lg:px-[100px] md:px-[50px] mt-9">
        <h1 className="text-[#101828] md:text-[46.6px] lg:text-[60px] xl:text-[80px] font-bold text-[33px] mb-10 px-2.5 leading-[110%]">
          {blog.title}
        </h1>
        <p className="text-gray-600 text-[30px] md:text-[36px] mb-3 px-2.5 leading-[110%]">
          {blog.description}
        </p>
        <p className=" mb-9 font-semibold px-2.5 text-[1.2rem] mt-7">
          <span className="font-medium ">By: </span> {blog.author}
        </p>
        <Image
          src={blog.banner.formats.large.url}
          width={1200}
          height={725}
          alt="blog-image"
          className="rounded-sm max-h-[674px]"
        />
        <div className="flex md:flex-row flex-col gap-14 md:mt-[100px] mt-2.5 px-2.5">
          <div className="flex flex-col gap-5">
            <p className="flex-1 md:text-[2.1rem] text-[1.3rem] wrap-break-word">
              {blog.content}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex-1 hidden md:flex">
                <Image
                  src="/arrow-left-line.svg"
                  alt="arrow-left-line"
                  width={24}
                  height={24}
                />
                <Link href="/blogs" className="text-[20px] text-[#1D2A49] ">
                  Back to Home
                </Link>
              </div>
              <ShareAndDownloadButtons pdfUrl={`/blogpdfs/${blogPdf}.pdf`} />
            </div>
          </div>

          <div className="flex-1 hidden xl:block max-h-[500px]">
            <h1 className="text-[#1D2A49] text-[24px] md:text-[36px] font-medium">
              Latest Blogs
            </h1>
            {sortedLatestBlogs?.slice(0, 2).map((blog, index) => (
              <div
                key={index}
                className="rounded-[10px] p-2 md:p-5 mt-2 border md:h-[225px] md:w-[461px] border-[rgba(68,98,169,0.2)] shadow-[0_4px_20px_0_rgba(153,86,236,0.08)]"
              >
                <p className="md:py-3 md:px-4 py-[9px] px-3 mb-3 text-left rounded-[sm bg-[rgba(68,98,169,0.1)] inline-flex">
                  {blog.title}
                </p>
                <p className="text-[#1D2A49] text-[12px] md:text-[12px] font-semibold">
                  {blog.description}
                </p>
                <Link
                  href={`/blogs/${encodeURIComponent(blog.title)}`}
                  className="flex "
                >
                  <p className="md:text-[16px] mt-2 text-[12px]">Read more</p>
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
