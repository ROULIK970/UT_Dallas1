import React from 'react'
import Image from 'next/image'
import { div, p } from 'framer-motion/client'
import { useArticleSearch } from '@/context/articleContext'

export default function ResultsSection() {

  const { articles } = useArticleSearch()
  console.log(articles)


  return (
    <>
      {articles.length ? (
        <div className="flex flex-col justify-center items-center mx-auto max-w-[80%] mt-[10em]">
          <div className="md:flex w-full rounded-[14px] border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] px-[21.889px] pt-[20.935px] pb-[21.9px]">
            <div className="text-left flex-1">
              <h1 className="text-[#101828] text-[17.5px]">Search Results</h1>
              <p className="text-[#4A5565] text-[14px]">
                Found {articles.length} articles matching your criteria
              </p>

            </div>
            <div className="flex-[0.3] flex items-center gap-4 md:justify-end">
              <p className="text-center text-[#364153] text-[12.3px]">Sort By:</p>
              <button className="rounded-[6.75px] border text-[12.3px] border-[#D1D5DC] bg-white pt-[7.889px] pb-[7.889px] text-[#0A0A0A] pr-[28.28px] pl-[14.94px]">
                Relevance
              </button>
            </div>
          </div>

          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-[14px] border w-full  border-[#E5E7EB] bg-white mt-3 mb-3 pt-[21.22px] pr-[21.889px] pb-[21.89px] pl-[21.889px]"
            >
              <div className="md:flex flex-col gap-3">

                <h1 className="text-[#101828] text-[15.8px] font-bold">{article.journalName}</h1>
                <div className='flex md:flex-row flex-col md:gap-9 text-[#4A5565] text-[14px]'>
                  <p>Article : {article.title}</p>
                  <p>Journal Abbreviation : {article.journalAbbreviation}</p>
                  <div className='flex gap-2'>
                    <Image src="/calendar.svg" width={14} height={14} alt="calendar" />
                    <p>2024</p>
                  </div>
                  <p>Volume: {article.volume}</p>
                </div>

                <div className='flex gap-2 text-[#4A5565] text-[16px]'>
                  <p>Authors :</p> 
                  <div className='flex flex-wrap md:flex-row flex-col md:gap-3'>
                    {article.author.map((a, i) => (
                      <div className='flex'>
                        <p>{a.firstName}</p>
                        <p>{a.lastName},</p>
                      </div>

                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center mt-10 text-gray-600">No results found</h1>
      )}
    </>
  )
}



