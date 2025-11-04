"use client"

export default function ProjectSkeleton() {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-muted/20 to-muted/5">
      {/* Image skeleton with layered depth effect */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-muted/60 to-muted/40">
        <div className="absolute inset-0 bg-gradient-to-r from-muted/80 via-muted/50 to-muted/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Content section with padding and spacing */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Title skeleton - large prominent line */}
        <div className="space-y-3">
          <div className="h-4 w-2/3 rounded-md bg-gradient-to-r from-muted/50 to-muted/40 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Description skeleton - multiple lines with varied widths */}
        <div className="space-y-2.5 pt-2">
          <div className="h-3 rounded-md bg-gradient-to-r from-muted/40 to-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
          <div className="h-3 w-5/6 rounded-md bg-gradient-to-r from-muted/40 to-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
        </div>

        {/* Footer section with tags and button */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          {/* Tech tag skeleton */}
          <div className="h-5 w-16 rounded-full bg-gradient-to-r from-muted/50 to-muted/40 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Button skeleton */}
          <div className="h-8 w-20 rounded-lg bg-gradient-to-r from-primary/30 to-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
