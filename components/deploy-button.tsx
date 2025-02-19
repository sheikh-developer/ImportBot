import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

const platforms = {
  vercel: {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/sheikh-developer/ImportBot",
  },
  netlify: {
    name: "Netlify",
    logo: "https://www.netlify.com/img/press/logos/logomark.png",
    deployUrl: "https://app.netlify.com/start/deploy?repository=https://github.com/sheikh-developer/ImportBot",
  },
  heroku: {
    name: "Heroku",
    logo: "https://www.herokucdn.com/favicon.ico",
    deployUrl: "https://heroku.com/deploy?template=https://github.com/sheikh-developer/ImportBot",
  },
  railway: {
    name: "Railway",
    logo: "https://railway.app/brand/logo-light.png",
    deployUrl: "https://railway.app/new/template?template=https://github.com/sheikh-developer/ImportBot",
  },
}

export function DeployButton({ platform }: { platform: keyof typeof platforms }) {
  const { name, logo, deployUrl } = platforms[platform]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild className="w-full">
            <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Image src={logo || "/placeholder.svg"} alt={`${name} logo`} width={20} height={20} className="mr-2" />
              Deploy to {name}
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Deploy to {name}</p>
          <p className="text-xs text-muted-foreground">Multi-region deployment available on Pro and Enterprise plans</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

