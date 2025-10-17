"use client"

import Image from "next/image"

export default function ShareAndDownloadButtons() {
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
    const link = document.createElement("a")
    link.href = "/files/article.pdf"
    link.download = "article.pdf"
    link.click()
  }

  return (
    <div className="flex flex-1 gap-2 justify-between md:justify-end items-center  w-full">
      <button
        onClick={handleShare}
        className="cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out py-[8px] items-center px-[10px] md:py-[16px] md:px-[20px] flex rounded-[9px] border border-black shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
      >
        <p className="md:text-[20px] text-[15px]">Share</p>
        <Image src="/share-icon.svg" alt="share" width={24} height={24} />
      </button>

      <button
        onClick={handleDownload}
        className="cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out py-[8px] items-center px-[10px] md:py-[16px] md:px-[20px] text-[15px] md:text-[20px] text-[#FFFFFF] rounded-[9px] bg-[#3B3098] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
      >
        Download PDF/ Doc
      </button>
    </div>
  )
}
