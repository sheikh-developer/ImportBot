"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import io, { type Socket } from "socket.io-client"

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001")
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server")
    })

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server")
    })

    return () => {
      newSocket.close()
    }
  }, [])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export function useSocket() {
  return useContext(SocketContext)
}

