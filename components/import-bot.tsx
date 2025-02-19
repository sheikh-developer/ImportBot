"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ZipUploadForm from "./zip-upload-form"
import UrlImportForm from "./url-import-form"
import GitImportForm from "./git-import-form"
import ThirdPartyGitImportForm from "./third-party-git-import-form"
import ImportStatus from "./import-status"
import AdvancedOptions from "./advanced-options"
import CDRuntimeIDE from "./cd-runtime-ide"
import GitSearch from "./git-search"
import BadgeGenerator from "./badge-generator"
import TrendingRepositories from "./trending-repositories"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function ImportBot() {
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [githubToken, setGithubToken] = useState<string | null>(null)
  const [advancedOptions, setAdvancedOptions] = useState({
    isPrivate: false,
    enableBranchProtection: false,
    enableDependabot: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem("github-token")
    setGithubToken(token)
  }, [])

  const handleImportComplete = (message: string) => {
    setImportStatus(message)
    toast({
      title: "Import Completed",
      description: message,
    })
  }

  if (!githubToken) {
    return <div className="text-center text-red-500">Please set a valid GitHub token to use ImportBot.</div>
  }

  return (
    <div className="space-y-8" id="import">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Localhost Usage Recommended</AlertTitle>
        <AlertDescription>
          For the best experience and security, we recommend running ImportBot on localhost. This ensures your GitHub
          token and imported data remain on your local machine.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="zip" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="zip">Upload ZIP</TabsTrigger>
          <TabsTrigger value="url">Import from URL</TabsTrigger>
          <TabsTrigger value="git">Import from Git</TabsTrigger>
          <TabsTrigger value="third-party">Third-Party Git</TabsTrigger>
          <TabsTrigger value="search">Git Search</TabsTrigger>
          <TabsTrigger value="badge">Badge Generator</TabsTrigger>
          <TabsTrigger value="trending">Trending Repos</TabsTrigger>
        </TabsList>
        <TabsContent value="zip">
          <ZipUploadForm
            onImportComplete={handleImportComplete}
            githubToken={githubToken}
            advancedOptions={advancedOptions}
          />
        </TabsContent>
        <TabsContent value="url">
          <UrlImportForm
            onImportComplete={handleImportComplete}
            githubToken={githubToken}
            advancedOptions={advancedOptions}
          />
        </TabsContent>
        <TabsContent value="git">
          <GitImportForm
            onImportComplete={handleImportComplete}
            githubToken={githubToken}
            advancedOptions={advancedOptions}
          />
        </TabsContent>
        <TabsContent value="third-party">
          <ThirdPartyGitImportForm
            onImportComplete={handleImportComplete}
            githubToken={githubToken}
            advancedOptions={advancedOptions}
          />
        </TabsContent>
        <TabsContent value="search">
          <GitSearch onImportComplete={handleImportComplete} githubToken={githubToken} />
        </TabsContent>
        <TabsContent value="badge">
          <BadgeGenerator />
        </TabsContent>
        <TabsContent value="trending">
          <TrendingRepositories githubToken={githubToken} />
        </TabsContent>
      </Tabs>
      <AdvancedOptions options={advancedOptions} setOptions={setAdvancedOptions} />
      <CDRuntimeIDE githubToken={githubToken} />
      {importStatus && <ImportStatus status={importStatus} />}
    </div>
  )
}

