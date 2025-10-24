"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useArticleSearch } from "@/context/articleContext"

import Navbar from "./Navbar"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { searchClicked } = useArticleSearch()
  const [windowWidth, setWindowWidth] = useState<number>(1372)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  let scaleValue = 1

  if (searchClicked) {
    if (windowWidth >= 1536) {
      scaleValue = 0.9
    } else if (windowWidth >= 1280) {
      scaleValue = 0.7
    } else if (windowWidth >= 1024) {
      scaleValue = 0.6
    } else if (windowWidth >= 837) {
      scaleValue = 0.5
    } else {
      scaleValue = 0
    }
  }

  return (
    <div>
      <div className="flex  justify-between items-center h-[124px] px-6 bg-white">
        <div className="relative w-[140px] md:w-[222px] h-[124px]">
          <Link href="/">
            <Image
              src="/FinerPlanet_logo.png"
              alt="Finer Planet"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {searchClicked && (
          <div style={{ transform: `scale(${scaleValue})` }}>
            <h1 className="text-[20px] md:text-[36px] font-bold text-center max-w-[80%] mx-auto">
              The Finerplanet Top 100 Business School Research Rankings™
            </h1>
            <div className="bg-gradient-to-r from-[#3B3098] to-[#00A649] w-[60px] h-[2px] mx-auto mt-1" />
          </div>
        )}

        {mobileMenuOpen ? (
          <Image
            src="/close-hamburger.svg"
            alt="menu"
            height={24}
            width={24}
            className="md:hidden block cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        ) : (
          <Image
            src="/hamburger-icon.svg"
            alt="menu"
            height={24}
            width={24}
            className="md:hidden block cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        )}

        <div className="hidden md:block relative w-[222px] h-[124px]">
          <Image
            src="/best-business-research.svg"
            alt="Sponsor"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </div>
  )
}
