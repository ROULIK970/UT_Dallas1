import React from 'react'
import Image from 'next/image'
import { div } from 'framer-motion/client'

export default function ResultsSection() {

    const resultCard = [
        {
            id:0,
            img: "/result-img.svg",
            articleHeading: "Digital Transformation and Organizational Performance in Business Schools",
            articleDetails: "This comprehensive study examines the impact of digital transformation initiatives on organizational performance within business schools. Through analysis of 150 institutions across 25 countries, we identify key success factors and implementation strategies...",
            logos: { authorLogo: "/articleLogos/author-logo.svg", orgLogo: "/articleLogos/org-logo.svg", yearLogo: "/articleLogos/year-logo.svg", reviewStar: "/articleLogos/reviewStar.svg" },
            authorNames: ["Dr. Sarah Chen", "Prof. Michael Torres", "Dr. Emily Zhang"],
            orgName: "havard Business Review",
            year: "2024",
            NoOfCitations: "47 citations",
            ratings: "9.2"
        },
        {
            id:1,
            img: "/result-img.svg",
            articleHeading: "Digital Transformation and Organizational Performance in Business Schools",
            articleDetails: "This comprehensive study examines the impact of digital transformation initiatives on organizational performance within business schools. Through analysis of 150 institutions across 25 countries, we identify key success factors and implementation strategies...",
            logos: { authorLogo: "/articleLogos/author-logo.svg", orgLogo: "/articleLogos/org-logo.svg", yearLogo: "/articleLogos/year-logo.svg", reviewStar: "/articleLogos/reviewStar.svg" },
            authorNames: ["Dr. Sarah Chen", "Prof. Michael Torres", "Dr. Emily Zhang"],
            orgName: "havard Business Review",
            year: "2024",
            NoOfCitations: "47 citations",
            ratings: "9.2"
        },
        {
            id:2,
            img: "/result-img.svg",
            articleHeading: "Digital Transformation and Organizational Performance in Business Schools",
            articleDetails: "This comprehensive study examines the impact of digital transformation initiatives on organizational performance within business schools. Through analysis of 150 institutions across 25 countries, we identify key success factors and implementation strategies...",
            logos: { authorLogo: "/articleLogos/author-logo.svg", orgLogo: "/articleLogos/org-logo.svg", yearLogo: "/articleLogos/year-logo.svg", reviewStar: "/articleLogos/reviewStar.svg" },
            authorNames: ["Dr. Sarah Chen", "Prof. Michael Torres", "Dr. Emily Zhang"],
            orgName: "havard Business Review",
            year: "2024",
            NoOfCitations: "47 citations",
            ratings: "9.2"
        },
        {
            id:3,
            img: "/result-img.svg",
            articleHeading: "Digital Transformation and Organizational Performance in Business Schools",
            articleDetails: "This comprehensive study examines the impact of digital transformation initiatives on organizational performance within business schools. Through analysis of 150 institutions across 25 countries, we identify key success factors and implementation strategies...",
            logos: { authorLogo: "/articleLogos/author-logo.svg", orgLogo: "/articleLogos/org-logo.svg", yearLogo: "/articleLogos/year-logo.svg", reviewStar: "/articleLogos/reviewStar.svg" },
            authorNames: ["Dr. Sarah Chen", "Prof. Michael Torres", "Dr. Emily Zhang"],
            orgName: "havard Business Review",
            year: "2024",
            NoOfCitations: "47 citations",
            ratings: "9.2"
        }
    ]


    return (
        <div className="flex flex-col justify-center items-center mx-auto max-w-[80%] mt-[10em]">
            <div className='md:flex w-full rounded-[14px] border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] px-[21.889px] pt-[20.935px] pb-[21.9px]'>
                <div className='text-left flex-1'>
                    <h1 className='text-[#101828] text-[17.5px]'>Search Results</h1>
                    <p className='text-[#4A5565] text-[14px]'>Found {2} articles matching your criteria</p>
                </div>
                <div className='flex-[0.3] flex items-center gap-4 md:justify-end'>
                    <p className='text-center text-[#364153] text-[12.3px]'>Sort By: </p>
                    <button className="rounded-[6.75px] border text-[12.3px] border-[#D1D5DC] bg-white pt-[7.889px] pb-[7.889px] text-[#0A0A0A] pr-[28.28px] pl-[14.94px]">Relevance</button>
                </div>
            </div>

            {resultCard.map(article => (
                <div key={article.id} className="rounded-[14px] border border-[#E5E7EB] bg-white mt-3 mb-3 pt-[21.22px] pr-[21.889px] pb-[21.89px] pl-[21.889px]">
                    <div className='md:flex gap-3'>
                        <Image src={article.img} alt='article-img' width={56} height={56} className='md:w-[56px] md:h-[56px]  w-full'/>
                        <div >
                            <h1 className='text-[#101828] text-[15.8px]'>{article.articleHeading}</h1>
                            <div className='flex mt-3 gap-2'>
                                <Image src={article.logos.authorLogo} width={12.3} height={12.3} alt='author-logo'/>
                                {article.authorNames.map((author, index) => (
                                    <div key={index} className='flex className="text-[#4A5565]"'>
                                        
                                        <p className='text-[12.3px] text-[#4A5565]'>{author}</p>
                                    </div>

                                ))}
                            </div>
                            <p className='text-[#4A5565] text-[14px] mb-3'>{article.articleDetails}</p>
                        </div>
                        <div className='flex items-center'>
                            <Image width={24} height={24} src={article.logos.reviewStar} alt='review-star' />
                            <p>{article.ratings}</p>
                        </div>
                    </div>
                </div>
            ))}



        </div>
    )
}
