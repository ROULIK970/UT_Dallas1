"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useArticleSearch } from "@/context/articleContext"

import { useInfiniteScroll } from "@/utils/infiniteScrollHook"

export default function ResultsSection() {
  const [isLatest, setIsLatest] = useState(false)

  const { articles, fetchArticles, hasMore, isLoading } = useArticleSearch()

  useInfiniteScroll({
    hasMore,
    loading: isLoading,
    onLoadMore: () => fetchArticles(undefined, true),
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {articles.length ? (
        <div className=" flex flex-col justify-center items-center mx-auto max-w-[80%] mt-[10em]">
          <div className="md:flex w-full sticky top-0 z-10 rounded-[14px] border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] px-[21.889px] pt-[20.935px] pb-[21.9px]">
            <div className="text-left flex-1 ">
              <h1 className="text-[#101828] text-[17.5px]">Search Results</h1>
              <p className="text-[#4A5565] text-[14px]">
                Found {articles.length} articles matching your criteria
              </p>
            </div>
            <div className="flex-[0.3] flex items-center gap-4 md:justify-end">
              <p className="text-center text-[#364153] text-[12.3px]">
                Sort By:
              </p>
              <select
                onChange={(e) => {
                  const selected = e.target.value === "latest"
                  setIsLatest(selected)
                  fetchArticles(undefined, false, selected)
                }}
                value={isLatest ? "latest" : "oldest"}
                className="cursor-pointer text-[12.3px] bg-white px-[14.94px] py-[7.889px] text-[#0A0A0A] "
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {articles.map((article, index) => (
            <div
              key={index}
              className="rounded-[14px] border w-full  border-[#E5E7EB] bg-white mt-3 mb-3 pt-[21.22px] pr-[21.889px] pb-[21.89px] pl-[21.889px] "
            >
              <div className="md:flex flex-col gap-3">
                <h1 className="text-[#101828] text-[15.8px] font-bold">
                  {article.journalName}
                </h1>
                <div className="flex md:flex-row flex-col md:gap-9 text-[#4A5565] text-[14px]">
                  <p className="max-w-[450px]">Article : {article.title}</p>
                  <p>Journal Abbreviation : {article.journalAbbreviation}</p>
                  <div className="flex gap-2 items-center h-[20px]">
                    <Image
                      src="/calendar.svg"
                      width={14}
                      height={14}
                      alt="calendar"
                    />
                    <p>{article.year}</p>
                  </div>
                  <p>Volume: {article.volume}</p>
                </div>

                <div className="flex gap-2 text-[#4A5565] text-[16px]">
                  <p>Authors :</p>
                  <div className="flex flex-wrap md:flex-row flex-col md:gap-3">
                    {article.author.map((a, i) => (
                      <div key={i} className="flex">
                        <p>{a.firstName}</p>
                        <p>{a.lastName},</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center py-5">
              <p className="text-gray-500 text-[14px]">
                Loading more articles...
              </p>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-center mt-10 text-gray-600">No results found</h1>
      )}

      <button
        onClick={scrollToTop}
        className="cursor-pointer fixed bottom-5 right-5 z-50 text-white text-xl px-4 py-2 rounded bg-green-900 hover:bg-green-800 transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        Go to Top
      </button>
    </>
  )
}
