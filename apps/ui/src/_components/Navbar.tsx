"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useArticleSearch } from "@/context/articleContext"
import { useNav } from "@/context/NavContext"

import Searchbar from "./Searchbar"

interface NavbarProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const router = useRouter()

  const { active, setActive } = useNav()

  const { setSearchClicked } = useArticleSearch()
  const navElements = [
    { id: 0, name: "Search by Author", key: "Author" },
    { id: 1, name: "Search by Article", key: "Article" },
    { id: 2, name: "Advance Search", key: "AdvancedSearch" },
    { id: 3, name: "Blogs", key: "Blogs" },
  ]

  const handleClick = async (key: string) => {
    setActive(key)
    if (key === "Blogs") {
      setMobileMenuOpen(false)
      router.push("/blogs")
      return
    } else {
      setSearchClicked(false)

      if (window.location.pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          const heroSection = document.getElementById("hero-description")
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else {
        const heroSection = document.getElementById("hero-description")
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* mobile Navbar */}
      {mobileMenuOpen ? (
        <div className="md:hidden bg-white -mt-5 text-[#2A2A2A] flex flex-col px-[25px] py-[18px] gap-4 z-0">
          {navElements.map((element) => (
            <button
              key={element.id}
              className="text-left text-sm border-b border-[#E5E7EB] cursor-pointer"
              onClick={() => handleClick(element.key)}
            >
              {element.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-[#1B212E] flex flex-col md:flex-row items-center justify-between h-auto md:h-[71px] px-4 gap-4">
          {/* Navigation buttons */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-evenly min-w-0 overflow-hidden">
            {navElements.map((element) => (
              <button
                key={element.id}
                className="text-white text-[16px] lg:text-[18px] whitespace-nowrap cursor-pointer"
                onClick={() => handleClick(element.key)}
              >
                <span className="relative">
                  {element.name}
                  {active === element.key && (
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gray-400"></span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Searchbar section */}
          <div className="w-full md:w-[240px] lg:w-[300px] xl:w-[380px] 2xl:w-[440px]">
            <Searchbar />
          </div>
        </div>
      )}
    </>
  )
}
