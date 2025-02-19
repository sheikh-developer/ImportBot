import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface CodeSnippetProps {
  language: string
  code: string
}

export function CodeSnippet({ language, code }: CodeSnippetProps) {
  return (
    <MonacoEditor
      height="300px"
      language={language}
      theme="vs-dark"
      value={code}
      options={{
        readOnly: true,
        minimap: { enabled: false },
      }}
    />
  )
}

