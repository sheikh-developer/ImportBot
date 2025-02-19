import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { loginWithGitHub } from "@/app/actions/auth"

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to ImportBot</CardTitle>
          <CardDescription>Connect your GitHub account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginWithGitHub}>
            <Button type="submit" className="w-full">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Login with GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

