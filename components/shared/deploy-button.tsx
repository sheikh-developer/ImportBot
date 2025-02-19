import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

type DeployButtonProps = {
  projectName: string
}

export default function DeployButton({ projectName }: DeployButtonProps) {
  const handleDeploy = (platform: string) => {
    // Implement deployment logic here
    console.log(`Deploying ${projectName} to ${platform}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Deploy <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDeploy("Vercel")}>Deploy to Vercel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeploy("Heroku")}>Deploy to Heroku</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeploy("Railway")}>Deploy to Railway</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

