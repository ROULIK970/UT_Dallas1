"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import SearchByForm from "./SearchByForm"
import { useNav } from "@/context/NavContext"
import { useArticleSearch } from "@/context/articleContext"
import { motion } from "framer-motion";
import ResultsSection from "./ResultsSection"


export default function Hero_Section() {


  const { searchClicked } = useArticleSearch()
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)


useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  
  let yValue = 0
  let scaleValue = 1

  if (searchClicked) {
    if(windowWidth >= 1536){
      yValue=-390
      scaleValue=0.6
    }
    else if(windowWidth >= 1280){
      yValue = -390
      scaleValue = 0.6
    }
    else if (windowWidth >= 1024) {
      yValue = -440
      scaleValue = 0.4
    }
    else if(windowWidth >= 837){
      yValue = -440
      scaleValue = 0.4
    } 
    else if (windowWidth >= 768) {
      yValue = -480
      scaleValue = 0.3
    } 
    else{
      yValue = 0
      scaleValue=0
    }
  }



  const { active } = useNav()
  console.log(active.split("-").join(" "))

  const heroDescriptions: Record<string, string> = {
    Author: "This search provides a listing of the papers based on university affiliation specified by the authors of the papers. Author names are not listed in the sequence of the actual publication. Also note that when information on authors is provided, if the same author is listed twice, it indicates that the author has listed multiple affiliations. All articles are written by at least one business school author. The authors marked with this color have Non-Business school affiliation within the specified article.If you choose multiple first names or multiple last names, this search will provide results with results written by all entered first names or last names. If you want to see collaboration of authors, please search on Collaboration page.",
    Article: "This search provides a listing of the papers based on article names specified. Author names are not listed in the sequence of the actual publication. Also note that when information on authors is provided, if the same author is listed twice, it indicates that the author has listed multiple affiliations. All articles are written by at least one business school author.",
    AdvancedSearch: "This search provides a listing of the papers based on university affiliation specified by the names of the papers. Only those papers that are published by authors from the business school of the university are counted in the rankings. Author names are not listed in the sequence of the actual publication. Also note that when information on authors is provided, if the same author is listed twice, it indicates that the author has listed multiple affiliations. All articles are written by at least one business school author.",
  }


  return (
    <div className="relative ">
      <div className="relative h-[568px] w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/Hero_Frame.png')" }}>
        {/* <Image className="object-cover z-0 relative" src="/Hero_Frame.png" width={1920} height={568} alt="Hero Frame" /> */}
        <div className="absolute md:top-[150px] top-[100px] flex flex-col  items-center justify-center mx-auto">
          {!searchClicked && <p className="rounded-[56px] bg-[linear-gradient(358deg,#9990E5_-30.8%,rgba(169,202,209,0.26)_96.38%)] text-[16px] p-[12px]">By {active.split("S").join(" S")}</p>}


          <motion.div
            animate={{ y: searchClicked ? yValue : 0, scale: searchClicked ? scaleValue : 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 30 }}
            className="text-center max-w-[80%] mx-auto"
          >
            <h1 className="text-[30px] md:text-[64px] font-bold">
              The Finerplanet Top 100 Business School Research Rankings™
            </h1>
            <div className="bg-gradient-to-r from-[#3B3098] to-[#00A649] w-[75px] h-[2.3px] mb-[20px] mx-auto" />
          </motion.div>




          {!searchClicked && <div className="flex w-full justify-between items-center md:max-w-[60%] max-w-[80%] mx-auto ">
            <div className="flex flex-col md:flex-row gap-3 justify-center text-center">
              <Image src="/Publications_logo.png" width={24} height={24} alt="publications logo" className="mx-auto" />
              <p className="text-[10px] md:text-[20px]">15,000+ Publications</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-center text-center">
              <Image src="/Researchers_logo.png" width={24} height={24} alt="researchers logo" className="mx-auto" />
              <p className="text-[10px] md:text-[20px]">500+ Researchers</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-center text-center">
              <Image src="/UpdatedAt_logo.png" width={24} height={24} alt="updated logo" className="mx-auto" />
              <p className="text-[10px]  md:text-[20px]">Updated 2024</p>
            </div>
          </div>}

        </div>
      </div>


      <motion.div
        animate={{ y: searchClicked ? -390 : 0, }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute mt-[-100px] w-full md:px-26 px-4  z-40"
      >

        <SearchByForm />

      </motion.div>




      {!searchClicked ? (
        <div className="flex flex-col justify-center items-center mx-auto max-w-[80%] md:mt-[24em] mt-[30em]">
          <h1 className="md:text-[64px] text-[32px] font-[700] text-center text-[#2A2A2A] mb-[10px]">{active.split("S").join(" S")}</h1>

          <p id="hero-description" className="md:text-[20px] text-[10px] text-center text-[#979797] mb-[3em]">{heroDescriptions[active]}</p>
        </div>
      ) : <ResultsSection />}

    </div>
  )
}
