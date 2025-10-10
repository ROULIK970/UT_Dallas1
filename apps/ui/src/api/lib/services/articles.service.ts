import axios from 'axios'
import { apiClient, basePath } from '../lib/apiClient'

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


export const getArticlesByFiltering = async (filters: Filters = {}) => {
    try {
        const { firstName = [], lastName = [], yearStart, yearEnd, journal = [], articleName = [], universityName = [], authorsName = [] } = filters

        const query = []

        query.push('populate=author')
//split firstName Lastname form in authors field
//remove university Name
        if (yearStart) query.push(`filters[year][$gte]=${yearStart}`)
        if (yearEnd) query.push(`filters[year][$lte]=${yearEnd}`)
        if (journal.length) query.push(`filters[journalName][$in]=${journal.map(j => encodeURIComponent(j)).join(',')}`)
        if (articleName.length) query.push(`filters[title][$in]=${articleName.map(a => encodeURIComponent(a)).join(',')}`)
            // if(authorsName.length) query.push(`filters[author][last][$in]=${articleName.map(a => encodeURIComponent(a)).join(',')}`)//check
        if(lastName.length) query.push(`filters[author][lastName][$in]=${lastName.map(l => encodeURIComponent(l)).join(',')}`)
        if(firstName.length) query.push(`filters[author][firstName][$in]=${firstName.map(f => encodeURIComponent(f)).join(',')}`)

            const queryString = query.join('&')
            

            const res = await apiClient.get(`articles?${queryString}`)
            console.log(res)

            const articlesData = res.data.data;

return articlesData
        


    } catch (error) {
        console.log(error)
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

    // Loop through all articles
    articles.forEach((article: any) => {
      // Add article title
      if (article.title) articleTitles.add(article.title)

      // Add journal name
      if (article.journalName) journals.add(article.journalName)

      // Add author first/last names
      if (Array.isArray(article.author)) {
        article.author.forEach((a: any) => {
          if (a.firstName) firstNames.add(a.firstName)
          if (a.lastName) lastNames.add(a.lastName)
        })
      }
    })

    // Convert sets to arrays suitable for react-select or custom selects
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

