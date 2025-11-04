"use client"

import { useState, useCallback, useEffect } from "react"
import { useProjects } from "./use-projects"

interface SearchResult {
  id: string
  title: string
  type: "project"
  description: string
}

export function useSearch() {
  const { projects } = useProjects()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([])
        return
      }

      const query = searchQuery.toLowerCase()
      const results: SearchResult[] = []

      // Search projects by title and description
      projects.forEach((project) => {
        if (project.title.toLowerCase().includes(query) || project.description.toLowerCase().includes(query)) {
          results.push({
            id: project.id,
            title: project.title,
            type: "project",
            description: project.description,
          })
        }
      })

      // Limit to 8 suggestions
      setSuggestions(results.slice(0, 8))
    },
    [projects],
  )

  useEffect(() => {
    performSearch(query)
  }, [query, performSearch])

  const handleSelect = (result: SearchResult) => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    // Return the selected result for navigation
    return result
  }

  return {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
    handleSelect,
  }
}
