"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Page = () => {
  const [hasSimpleWill, setHasSimpleWill] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Logic to check if the user has a simple will (for example, checking from a context, API, etc.)
    // For the sake of this example, let's assume we have a state or API to determine that.
    // Replace with actual check logic.
    const userHasSimpleWill = true  // This would be dynamic based on user data.
    setHasSimpleWill(userHasSimpleWill)
  }, [])

  const handleRedirect = () => {
    router.push('/check-my-will/simple')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {hasSimpleWill ? (
        <div className="w-full max-w-md text-center">
          <Button onClick={handleRedirect} className="w-full">
            Check Your Simple Will
          </Button>
        </div>
      ) : (
        <p>You do not have a Simple Will.</p>
      )}
    </div>
  )
}

export default Page
