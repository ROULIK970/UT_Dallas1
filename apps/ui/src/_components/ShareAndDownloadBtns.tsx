"use client"

import Image from "next/image"

interface Props {
  pdfUrl: string
}

export default function ShareAndDownloadButtons({ pdfUrl }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this article!",
          text: "I found this interesting article.",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled:", err)
      }
    } else {
      alert("Sharing not supported in this browser.")
    }
  }

  const handleDownload = () => {
    if (!pdfUrl) return alert("PDF not available.")
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = pdfUrl.split("/").pop() || "article.pdf"
    link.click()
  }

  return (
    <div className="flex flex-1 gap-2 justify-between md:justify-end items-center w-full">
      <button
        onClick={handleShare}
        className="cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out py-2 items-center px-2.5 md:py-4 md:px-5 flex rounded-[9px] border border-black shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
      >
        <p className="lg:text-[16px] xl:text-[14px] 2xl:text-[20px]">Share</p>
        <Image src="/share-icon.svg" alt="share" width={15} height={15} />
      </button>

      <button
        onClick={handleDownload}
        className="cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out py-2 items-center px-2.5 md:py-4 md:px-5 lg:text-[16px] xl:text-[14px] 2xl:text-[20px] text-[#FFFFFF] rounded-[9px] bg-[#3B3098] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
      >
        Download PDF/ Doc
      </button>
    </div>
  )
}
