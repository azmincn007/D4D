import React from 'react'
import { Link } from 'react-router-dom'

function Errorpage404() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 animate-bounce">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Oops! Page Not Found</h1>
        <p className="max-w-md text-muted-foreground md:text-lg">
          The page you're looking for doesn't seem to exist. Let's get you back on track.
        </p>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default Errorpage404
