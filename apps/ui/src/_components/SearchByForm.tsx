"use client"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNav } from "@/context/NavContext"
import CustomSelect from "./CustomSelect"
import { useArticleSearch } from "@/context/articleContext"
import Image from "next/image"
import { getFilterOptions } from "@/api/lib/services/articles.service"

export default function SearchByForm() {

const [firstnameOptions, setFirstnameOptions] = useState<{value: string, label: string}[]>([])
const [lastnameOptions, setLastnameOptions] = useState<{value: string, label: string}[]>([])
const [journalOptions, setJournalOptions] = useState<{value: string, label: string}[]>([])
const [articleOptions, setArticleOptions] = useState<{value: string, label: string}[]>([])

useEffect(() => {
  async function fetchOptions() {
    const data = await getFilterOptions()
    setFirstnameOptions(data.firstNameOptions)
    setLastnameOptions(data.lastNameOptions)
    setJournalOptions(data.journalOptions)
    setArticleOptions(data.articleNameOptions)
  }
  fetchOptions()
}, [])

  const { active } = useNav()
  const {fetchArticles, searchClicked, setSearchClicked } = useArticleSearch()
 const [yearOptions, setYearOptions] = useState<number[]>([])

useEffect(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year)
  }
  setYearOptions(years)
}, [])

 


const YearComponent = () => (
  <div className="flex flex-col md:max-w-[45%] text-left flex-1 md:flex-[0.5] ">
    <label className="text-[16px] text-[#333] mb-[10px]" htmlFor="yearRange">
      Select the year range
    </label>

    <div className="flex items-center border rounded-lg overflow-hidden p-[10px] bg-[#F1F5FF]">
      {/* Start Year */}
      <div className="flex items-center md:px-3 py-2 flex-1">
        <Image src="/calendar.svg" alt="start-year-icon" width={18.5} height={18.5} className="mr-2" />
        <select
          id="yearStart"
          name="yearStart"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.yearStart}
          className="w-full bg-transparent outline-none text-[#000]"
        >
          <option value="">1990</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      
      <div className="h-[65%] w-px bg-[#D1D5DB] mx-2" />

      {/* End Year */}
      <div className="flex items-center md:px-3 py-2 flex-1">
        <Image src="/calendar.svg" alt="end-year-icon" width={18.5} height={18.5} className="mr-2" />
        <select
          id="yearEnd"
          name="yearEnd"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.yearEnd}
          className="w-full bg-transparent  text-[#000]"
        >
          <option value="">2025</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Error messages below */}
    <div className="flex gap-2 mt-1">
      {formik.touched.yearStart && formik.errors.yearStart && (
        <div className="text-red-500 text-sm flex-1">{formik.errors.yearStart}</div>
      )}
      {formik.touched.yearEnd && formik.errors.yearEnd && (
        <div className="text-red-500 text-sm flex-1">{formik.errors.yearEnd}</div>
      )}
    </div>
  </div>
)


  interface FormValues {
    firstName: string[]
    lastName: string[]
    yearStart: string
    yearEnd: string
    journal: string[]
    articleName: string[]
    universityName: string[]
    authorsName: string[]
  }

 



  const validationSchemaMap: Record<string, Yup.ObjectSchema<any>> = {
    Author: Yup.object({
      firstName: Yup.array(),
      lastName: Yup.array(),
      yearStart: Yup.date().required("Start Year Required"),
      yearEnd: Yup.date().required("End Year Required"),
      journal: Yup.array(),
    }),
    Article: Yup.object({
      articleName: Yup.array(),
      yearStart: Yup.date().required("Start Year Required"),
      yearEnd: Yup.date().required("End Year Required"),
      journal: Yup.array(),
    }),
    AdvancedSearch: Yup.object({
      universityName: Yup.array().min(1, "Select at least one university name").required("Required"),
      authorsName: Yup.array().min(1, "Select at least one authors name").required("Required"),
      articleName: Yup.array().min(1, "Select at least one article name").required("Required"),
      yearStart: Yup.date().required("Start Year Required"),
      yearEnd: Yup.date().required("End Year Required"),
    }),
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: [],
      lastName: [],
      yearStart: "1990",
      yearEnd: "2025",
      journal: [],
      articleName: [],
      universityName: [],
      authorsName: [],
    },
    validationSchema: validationSchemaMap[active],

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2))
      setSearchClicked(true)
      await fetchArticles(values)
    },
  })

  return (
    <div className="w-full text-white  bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-[14px] mt-[20px]">
      <form onSubmit={formik.handleSubmit} className="p-4 relative">
        {/* Authors form */}
        {active === "Author" && (
          <div className=" flex flex-col gap-6">
            <div className="2xl:flex  gap-6 ">
              <div className="text-left flex-1">
                <div className="flex">
                  <label className="flex-1 text-[16px] text-[#333] mb-[10px]" htmlFor="firstName">
                    Author's First Name (You can select multiple Authors)
                  </label>
                 <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span> 
                </div>

                <CustomSelect
                instanceId="firstName-select"
                  name="firstName"
                  inputId="firstName"
                  options={firstnameOptions}
                  isMulti
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={(value) => formik.setFieldValue("firstName", value)}
                />

                {formik.touched.firstName && formik.errors.firstName ? <div className="text-red-500 text-sm">{formik.errors.firstName}</div> : null}
              </div>

              <div className="text-left flex-1">
                <div className="flex">
                  <label className="text-[16px] flex-1 text-[#333] mb-[10px]" htmlFor="lastName">
                    Author's Last Name (You can select multiple Authors)
                  </label>
                  <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span>
                </div>

                <CustomSelect
                instanceId="firstName-select"
                  inputId="lastName"
                  name="lastName"
                  options={lastnameOptions}
                  isMulti
                  placeholder="Enter last name"
                  value={formik.values.lastName}
                  onChange={(value) => formik.setFieldValue("lastName", value)}
                />
                {formik.touched.lastName && formik.errors.lastName ? <div className="text-red-500 text-sm">{formik.errors.lastName}</div> : null}
              </div>

              {/* Year Range */}
              <YearComponent />
            </div>

            <div className="text-left mb-3">
              <div className="flex">
                <label className="text-[16px] mr-[15px] text-[#333] mb-[10px]" htmlFor="journals">
                  Journals
                </label>
                <span className="text-black"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span></div>

              <CustomSelect
              instanceId="firstName-select"             
                name="journal"
                inputId="journals"
                options={journalOptions}
                isMulti
                placeholder="Select journal"
                value={formik.values.journal}
                onChange={(value) => formik.setFieldValue("journal", value)}
              />

              {formik.touched.journal && formik.errors.journal && (
                <div className="text-red-500 text-sm">{formik.errors.journal}</div>
              )}
            </div>
          </div>
        )}

        {/* Article Form */}

        {active === "Article" && (
          <div className="flex flex-col gap-3">
            <div className="2xl:flex  md:flex-row flex-col gap-6">
              <div className="text-left flex flex-col flex-2">
                <div className="flex">
                  <label className="text-[16px] flex-1 mb-[10px] text-[#333]" htmlFor="articleName">
                    Start typing Article's Name (You can select multiple Articles)
                  </label>
                  <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span></div>


                <CustomSelect
                instanceId="firstName-select"
                  inputId="articleName"
                  name="articleName"
                  options={articleOptions}
                  isMulti
                  placeholder="Enter article name"
                  value={formik.values.articleName}
                  onChange={(value) => formik.setFieldValue("articleName", value)}
                />
                {formik.touched.articleName && formik.errors.articleName ? (
                  <div className="text-red-500 text-sm">{formik.errors.articleName}</div>
                ) : null}
              </div>

              {/* Year Range */}
              <YearComponent />
            </div>

            <div className="text-left mb-3">
              <div className="flex">
                <label className="text-[16px] mr-[15px] text-[#333] mb-[10px]" htmlFor="journal">
                  Journals
                </label>
                <span className="text-black"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span>
              </div>

              <CustomSelect
              instanceId="firstName-select"
                name="journal"
                inputId="journal"
                options={journalOptions}
                isMulti
                placeholder="Select journal"
                value={formik.values.journal}
                onChange={(value) => formik.setFieldValue("journal", value)}
              />
              {formik.touched.journal && formik.errors.journal && (
                <div className="text-red-500 text-sm">{formik.errors.journal}</div>
              )}
            </div>
          </div>
        )}

        {/* Advanced Search Form */}

        {active === "AdvancedSearch" && (
          <div className="flex  flex-col gap-3">
            <div className="2xl:flex md:flex-row flex-col gap-6">
              
   
              <div className="text-left flex-1">
                <div className="flex">
                  <label className="flex-1 text-[16px] text-[#333] mb-[10px]" htmlFor="firstName">
                    Author's First Name (You can select multiple Authors)
                  </label>
                  <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span>
                </div>

                <CustomSelect
                instanceId="firstName-select"
                  name="firstName"
                  inputId="firstName"
                  options={firstnameOptions}
                  isMulti
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={(value) => formik.setFieldValue("firstName", value)}
                />

                {formik.touched.firstName && formik.errors.firstName ? <div className="text-red-500 text-sm">{formik.errors.firstName}</div> : null}
              </div>

              <div className="text-left flex-1">
                <div className="flex">
                  <label className="text-[16px] flex-1 text-[#333] mb-[10px]" htmlFor="lastName">
                    Author's Last Name (You can select multiple Authors)
                  </label>
                  <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span>
                </div>

                <CustomSelect
                instanceId="firstName-select"
                  inputId="lastName"
                  name="lastName"
                  options={lastnameOptions}
                  isMulti
                  placeholder="Enter last name"
                  value={formik.values.lastName}
                  onChange={(value) => formik.setFieldValue("lastName", value)}
                />
                {formik.touched.lastName && formik.errors.lastName ? <div className="text-red-500 text-sm">{formik.errors.lastName}</div> : null}
              </div>
              <YearComponent />
            </div>
            
            <div className="text-left flex flex-col">
              <div className="flex">
                <label className="text-[16px]  text-[#333] mb-[10px]" htmlFor="articleName">
                  Start typing Articles's Name (You can select multiple Articles)
                </label>
                <span className="text-black flex-[0.1] flex justify-end"><Image src="/form-icon.svg" alt="form-icon" width={18.5} height={18.5} /></span>
              </div>

              <CustomSelect
              instanceId="firstName-select"
                inputId="articleName"
                name="articleName"
                options={articleOptions}
                isMulti
                placeholder="Enter article name"
                value={formik.values.articleName}
                onChange={(value) => formik.setFieldValue("articleName", value)}
              />
              {formik.touched.articleName && formik.errors.articleName ? <div className="text-red-500 text-sm">{formik.errors.articleName}</div> : null}
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`absolute md:bottom-[-30px] bottom-[-21px] cursor-pointer left-1/2 -translate-x-1/2 
             rounded-[9px] ${searchClicked ? "bg-[#3B3098] text-white" : "bg-[#E1E3E8] text-[#1B212E]"} 
             md:text-[20px] w-full md:w-auto text-[13px] md:py-[10px] py-[6px] md:px-[180px] px-[50px]`}
        >
          SEARCH
        </button>
      </form>
    </div>
  )
}
