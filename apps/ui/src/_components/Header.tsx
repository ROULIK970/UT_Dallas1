"use client"
import React from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


   console.log(mobileMenuOpen)
  return (
    <div>
      <div className="flex justify-between items-center h-[124px] px-6 bg-white">



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

         <Image src='/hamburger-icon.svg' alt='menu' height={24} width={24} className='md:hidden block' onClick={() => setMobileMenuOpen(prev => !prev)}/>
      
        <div className="hidden md:block relative w-[222px] h-[124px]">
          <Image
            src="/Sponsor_logo.png"
            alt="Sponsor"
            fill
            className="object-contain"
          />
        </div>

        
      </div>
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  )
}
