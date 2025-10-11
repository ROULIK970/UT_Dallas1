"use client"

import React from 'react'
import Searchbar from './Searchbar'
import { useNav } from '@/context/NavContext'
import { useArticleSearch } from '@/context/articleContext'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {

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
    if (key === 'Blogs') {
      router.push('/Blogs')
    } else {
      
      setSearchClicked(false)

      if (window.location.pathname !== '/') {

        router.push('/')
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
  }

  return (
    <>
      {/* desktop navbar */}
      <div className="bg-[#1B212E] flex items-center h-[71px] px-6 gap-6">
        {navElements.map((element) => (
          <button
            key={element.id}
            className="text-white hidden md:block flex-1 text-[18px] text-center cursor-pointer"
            onClick={() => handleClick(element.key)}

          >
            <span className="relative">
              {element.name}
              {active === element.key && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-400"></span>
              )}

            </span>


          </button>
        ))}


        <div className="flex-[3]">
          <Searchbar />
        </div>
      </div>
      {/* mobile Navbar */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1B212E] flex flex-col px-[25px] py-[18px] gap-4">
          {navElements.map((element) => (
            <button
              key={element.id}
              className="text-white text-left text-sm"
              onClick={() => handleClick(element.key)}
            >
              {element.name}
            </button>
          ))}

        </div>
      )}
    </>


  )
}
