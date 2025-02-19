"use client"

import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"

interface CodeSnippetProps {
  language: string
  code: string
}

export default function CodeSnippet({ language, code }: CodeSnippetProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: code,
        language: language,
        theme: "vs-dark",
        readOnly: true,
        minimap: { enabled: false },
        automaticLayout: true,
      })

      return () => {
        editor.dispose()
      }
    }
  }, [language, code])

  return <div ref={editorRef} style={{ height: "200px", width: "100%" }} />
}

