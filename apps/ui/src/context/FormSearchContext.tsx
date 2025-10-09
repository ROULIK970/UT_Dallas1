"use client"
import React, { createContext, useContext, useState } from "react"

type FormSearchContextType = {
  searchClicked: boolean
  setSearchClicked: (value: boolean) => void
}

const FormSearchContext = createContext<FormSearchContextType | undefined>(undefined)

export function FormSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchClicked, setSearchClicked] = useState(false) 

  return (
    <FormSearchContext.Provider value={{ searchClicked, setSearchClicked }}>
      {children}
    </FormSearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(FormSearchContext)
  if (!context) throw new Error("useSearch must be used inside FormSearchProvider")
  return context
}
