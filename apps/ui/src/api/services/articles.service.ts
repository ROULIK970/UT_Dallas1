import { apiClient } from '../lib/lib/apiClient'

type Filters = {
  firstName?: string[]
  lastName?: string[]
  yearStart?: string
  yearEnd?: string
  journal?: string[]
  articleName?: string[]
  universityName?: string[]
  authorsName?: string[]
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
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


export const getArticlesByFiltering = async (
  filters: Filters = {},
  page: number = 1,
  pageSize = 25,
  isLatest = false
): Promise<{ articles: Article[]; pagination: Pagination }> => {
  try {
    const { firstName = [], lastName = [], yearStart, yearEnd, journal = [], articleName = [] } = filters

    const query = []


    query.push('populate=author')
    query.push(`pagination[page]=${page}`)
    query.push(`pagination[pageSize]=${pageSize}`)


    if (yearStart) query.push(`filters[year][$gte]=${yearStart}`)
    if (yearEnd) query.push(`filters[year][$lte]=${yearEnd}`)
    if (journal.length) {
      journal.forEach((j, index) => {
        query.push(`filters[journalName][$in][${index}]=${encodeURIComponent(j)}`)
      })
    }
    if (articleName.length) {
      articleName.forEach((a, index) => {
        query.push(`filters[title][$in][${index}]=${encodeURIComponent(a)}`)
      })
    }
    // if(authorsName.length) query.push(`filters[author][last][$in]=${articleName.map(a => encodeURIComponent(a)).join(',')}`)//check
    if (lastName.length) {
      lastName.forEach((l, index) => {
        query.push(`filters[author][lastName][$in][${index}]=${encodeURIComponent(l)}`)
      })
    }

    if (firstName.length) {
      firstName.forEach((f, index) => {
        query.push(`filters[author][firstName][$in][${index}]=${encodeURIComponent(f)}`)
      })
    }


    isLatest ? query.push('sort[0]=year:desc'): query.push('sort[0]=year:asc')
    



    const queryString = query.join('&')


    const res = await apiClient.get(`articles?${queryString}`)
    console.log(res)

    const articlesData = res.data.data;
    const pagination = res.data.meta.pagination

    return {
      articles: articlesData,
      pagination,
    }



  } catch (error: any) {
    console.log(error)
    throw new Error(error.message || "Failed to fetch articles")
  }
}





export async function getFilterOptions() {
  try {
    const response = await apiClient.get("/articles?populate=author&pagination[pageSize]=100")
    const articles = response.data.data

    const firstNames = new Set<string>()
    const lastNames = new Set<string>()
    const journals = new Set<string>()
    const articleTitles = new Set<string>()


    articles.forEach((article: any) => {

      if (article.title) articleTitles.add(article.title)


      if (article.journalName) journals.add(article.journalName)


      if (Array.isArray(article.author)) {
        article.author.forEach((a: any) => {
          if (a.firstName) firstNames.add(a.firstName)
          if (a.lastName) lastNames.add(a.lastName)
        })
      }
    })


    return {
      firstNameOptions: Array.from(firstNames).map(v => ({ value: v, label: v })),
      lastNameOptions: Array.from(lastNames).map(v => ({ value: v, label: v })),
      journalOptions: Array.from(journals).map(v => ({ value: v, label: v })),
      articleNameOptions: Array.from(articleTitles).map(v => ({ value: v, label: v })),
    }
  } catch (err: any) {
    console.error("Error fetching filter options:", err.response?.data || err.message)
    return {
      firstNameOptions: [],
      lastNameOptions: [],
      journalOptions: [],
      articleNameOptions: [],
    }
  }
}

