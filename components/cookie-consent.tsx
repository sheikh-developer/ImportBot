"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Cookies from "js-cookie"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = Cookies.get("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set("cookie-consent", "true", { expires: 365 })
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Cookie Consent</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAccept} variant="secondary">
          Accept
        </Button>
      </CardFooter>
    </Card>
  )
}

