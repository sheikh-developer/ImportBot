"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type TokenContextType = {
  token: string | null
  setToken: (token: string) => void
  validateToken: () => Promise<boolean>
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("github-token")
    if (storedToken) {
      setTokenState(storedToken)
    } else {
      router.push("/")
    }
  }, [router])

  const setToken = (newToken: string) => {
    localStorage.setItem("github-token", newToken)
    setTokenState(newToken)
  }

  const validateToken = async () => {
    if (!token) return false
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      return response.ok
    } catch (error) {
      return false
    }
  }

  return <TokenContext.Provider value={{ token, setToken, validateToken }}>{children}</TokenContext.Provider>
}

export function useToken() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider")
  }
  return context
}

