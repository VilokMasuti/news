"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We encountered an error while trying to load the news. Please try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} className="inline-flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  )
}

