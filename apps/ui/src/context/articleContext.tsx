"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { getArticlesByFiltering } from "@/api/lib/services/articles.service"

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

interface Article {
  id: number
  documentId: string
  title: string
  year: number
  volume: string
  journalName: string
  journalAbbreviation: string
  author: string[]
}

interface ArticleSearchContextType {
  filters: FormValues
  setFilters: (filters: FormValues) => void
  articles: Article[]
  isLoading: boolean
  error: string | null
  fetchArticles: (filtersParam?: FormValues) => Promise<void>
  searchClicked: boolean
  setSearchClicked: (value: boolean) => void
}

const ArticleSearchContext = createContext<ArticleSearchContextType | undefined>(undefined)

export function ArticleSearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FormValues>({
    firstName: [],
    lastName: [],
    yearStart: "1990",
    yearEnd: "2025",
    journal: [],
    articleName: [],
    universityName: [],
    authorsName: [],
  })
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchClicked, setSearchClicked] = useState(false)

  const fetchArticles = async (filtersParam?: FormValues) => {
    try {
      setIsLoading(true)
      setError(null)
      const data: Article[] = await getArticlesByFiltering(filtersParam || filters)
      setArticles(data)
    } catch (err: any) {
      setError(err.message || "Error fetching articles")
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ArticleSearchContext.Provider
      value={{
        filters,
        setFilters,
        articles,
        isLoading,
        error,
        fetchArticles,
        searchClicked,
        setSearchClicked,
      }}
    >
      {children}
    </ArticleSearchContext.Provider>
  )
}

export function useArticleSearch() {
  const context = useContext(ArticleSearchContext)
  if (!context) {
    throw new Error("useArticleSearch must be used within ArticleSearchProvider")
  }
  return context
}
