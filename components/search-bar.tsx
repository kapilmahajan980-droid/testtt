"use client"

import { Search, X } from "lucide-react"
import { useSearch } from "@/lib/use-search"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function SearchBar() {
  const { query, setQuery, suggestions, isOpen, setIsOpen, handleSelect } = useSearch()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setIsOpen])

  const clearSearch = () => {
    setQuery("")
  }

  return (
    <>
      {/* Desktop Search - visible on md and up */}
      <div className="hidden md:flex w-full relative flex-col" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-9 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown - Enhanced styling */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <Link
                key={suggestion.id}
                href={`/project/${suggestion.id}`}
                className="block px-4 py-3 hover:bg-muted/50 transition cursor-pointer"
                onClick={() => handleSelect(suggestion)}
                style={{
                  borderBottom: index !== suggestions.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="font-medium text-foreground text-sm truncate">{suggestion.title}</div>
                <div className="text-xs text-muted-foreground truncate mt-1">{suggestion.description}</div>
              </Link>
            ))}
          </div>
        )}

        {/* No results message */}
        {isOpen && query && suggestions.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center">
            <p className="text-sm text-muted-foreground">No projects found</p>
          </div>
        )}
      </div>

      {/* Mobile Search Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition"
        aria-label="Toggle search"
      >
        <Search className="h-5 w-5 text-foreground" />
      </button>

      {/* Mobile Search Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 md:hidden z-50 bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-muted/50 rounded-lg transition"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <div className="flex-1 relative" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setIsOpen(true)
                  }}
                  onFocus={() => setIsOpen(true)}
                  autoFocus
                  className="w-full pl-10 pr-9 py-2 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-[rgba(255,255,255,1)]"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Suggestions List */}
            <div className="flex-1 overflow-y-auto">
              {isOpen && suggestions.length > 0 ? (
                <div className="divide-y divide-border">
                  {suggestions.map((suggestion) => (
                    <Link
                      key={suggestion.id}
                      href={`/project/${suggestion.id}`}
                      className="block px-4 py-4 hover:bg-muted/50 transition"
                      onClick={() => {
                        handleSelect(suggestion)
                        setIsMobileOpen(false)
                      }}
                    >
                      <div className="font-medium text-foreground">{suggestion.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{suggestion.description}</div>
                    </Link>
                  ))}
                </div>
              ) : isOpen && query ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">No projects found</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground text-sm">Start typing to search</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
