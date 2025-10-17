"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"
import { getArticlesByFiltering } from "@/api/services/articles.service"

interface FormValues {
  firstName: string[]
  lastName: string[]
  yearStart: string
  yearEnd: string
  journal: string[]
  articleName: string[]
}

interface Author {
  firstName: string
  lastName: string
}

interface Article {
  id: number
  documentId: string
  title: string
  year: number
  volume: string
  journalName: string
  journalAbbreviation: string
  author: Author[]
}

interface ArticleSearchContextType {
  filters: FormValues
  setFilters: (filters: FormValues) => void
  articles: Article[]
  isLoading: boolean
  error: string | null
  fetchArticles: (
    filtersParam?: FormValues,
    loadMore?: boolean,
    isLatest?: boolean
  ) => Promise<void>
  searchClicked: boolean
  setSearchClicked: (value: boolean) => void
  hasMore: boolean
  page: number
}

const ArticleSearchContext = createContext<
  ArticleSearchContextType | undefined
>(undefined)

export function ArticleSearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FormValues>({
    firstName: [],
    lastName: [],
    yearStart: "1990",
    yearEnd: "2025",
    journal: [],
    articleName: [],
  })

  const [articles, setArticles] = useState<Article[]>([])
  const [currentFilters, setCurrentFilters] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchClicked, setSearchClicked] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchArticles = async (
    filtersParam?: FormValues,
    loadMore = false,
    isLatest: boolean = false
  ) => {
    try {
      setIsLoading(true)
      const currentPage = loadMore ? page + 1 : 1
      console.log(loadMore)
      setError(null)

      const activeFilters = filtersParam || currentFilters || filters

      if (filtersParam) {
        setCurrentFilters(filtersParam)
      }
      const { articles: newData, pagination } = await getArticlesByFiltering(
        activeFilters,
        currentPage,
        25,
        isLatest
      )
      setPage(currentPage)
      setHasMore(currentPage < pagination.pageCount)

      if (loadMore) {
        setArticles((prev) => [...prev, ...newData])
      } else {
        setArticles(newData)
      }
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
        hasMore,
        page,
      }}
    >
      {children}
    </ArticleSearchContext.Provider>
  )
}

export function useArticleSearch() {
  const context = useContext(ArticleSearchContext)
  if (!context) {
    throw new Error(
      "useArticleSearch must be used within ArticleSearchProvider"
    )
  }
  return context
}
