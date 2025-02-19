import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

const GitLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-12 h-12">
    <path
      fill="currentColor"
      d="M 46.792969 22.089844 L 27.910156 3.207031 C 27.109375 2.402344 26.054688 2 25 2 C 23.945313 2 22.890625 2.402344 22.089844 3.207031 L 18.355469 6.941406 L 22.976563 11.5625 C 24.511719 10.660156 26.511719 10.855469 27.828125 12.171875 C 29.144531 13.488281 29.335938 15.488281 28.433594 17.019531 L 32.976563 21.5625 C 34.511719 20.660156 36.511719 20.855469 37.828125 22.171875 C 39.390625 23.734375 39.390625 26.265625 37.828125 27.828125 C 36.265625 29.390625 33.734375 29.390625 32.171875 27.828125 C 30.855469 26.511719 30.660156 24.511719 31.5625 22.976563 L 27.019531 18.433594 C 26.695313 18.625 26.355469 18.765625 26 18.855469 L 26 31.140625 C 27.722656 31.585938 29 33.136719 29 35 C 29 37.210938 27.210938 39 25 39 C 22.789063 39 21 37.210938 21 35 C 21 33.136719 22.277344 31.585938 24 31.140625 L 24 18.855469 C 23.332031 18.683594 22.695313 18.351563 22.171875 17.828125 C 20.855469 16.511719 20.664063 14.511719 21.566406 12.980469 L 16.941406 8.355469 L 3.207031 22.089844 C 1.597656 23.695313 1.597656 26.304688 3.207031 27.910156 L 22.089844 46.792969 C 22.890625 47.597656 23.945313 48 25 48 C 26.054688 48 27.109375 47.597656 27.910156 46.792969 L 46.792969 27.910156 C 48.402344 26.304688 48.402344 23.695313 46.792969 22.089844 Z"
    />
  </svg>
)

const GithubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-12 h-12">
    <linearGradient id="gradient" x1="37.087" x2="10.76" y1="10.967" y2="37.294" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#6560fe" />
      <stop offset=".033" stopColor="#6f6afe" />
      <stop offset=".197" stopColor="#9a97fe" />
      <stop offset=".362" stopColor="#bfbdff" />
      <stop offset=".525" stopColor="#dbdaff" />
      <stop offset=".687" stopColor="#efeeff" />
      <stop offset=".846" stopColor="#fbfbff" />
      <stop offset="1" stopColor="#fff" />
    </linearGradient>
    <circle cx="23.924" cy="24.13" r="18.615" fill="url(#gradient)" />
    <path
      fill="none"
      stroke="#8251fe"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M35.054,38.836C31.97,41.137,28.144,42.5,24,42.5C13.783,42.5,5.5,34.217,5.5,24 c0-2.917,0.675-5.676,1.878-8.13"
    />
    <path
      fill="none"
      stroke="#8251fe"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M13.869,8.518C16.779,6.61,20.26,5.5,24,5.5c10.217,0,18.5,8.283,18.5,18.5c0,2.941-0.686,5.721-1.907,8.19"
    />
    <path
      fill="#8251fe"
      d="M34,23c0-1.574-0.576-3.038-1.558-4.275c0.442-1.368,0.93-3.771-0.242-5.648c-2.251,0-3.73,1.545-4.436,2.514 C26.602,15.213,25.333,15,24,15s-2.602,0.213-3.764,0.591c-0.706-0.969-2.184-2.514-4.436-2.514c-1.328,2.126-0.526,4.45-0.073,5.43 C14.638,19.788,14,21.334,14,23c0,3.78,3.281,6.94,7.686,7.776c-1.309,0.673-2.287,1.896-2.587,3.38h-1.315 c-1.297,0-1.801-0.526-2.502-1.415c-0.692-0.889-1.437-1.488-2.331-1.736c-0.482-0.051-0.806,0.316-0.386,0.641 c1.419,0.966,1.516,2.548,2.085,3.583C15.168,36.161,16.229,37,17.429,37H19v5.942h10v-7.806c0-1.908-1.098-3.544-2.686-4.36 C30.719,29.94,34,26.78,34,23z"
    />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <GithubLogo />
            <span className="text-xl font-bold">ImportBot</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
              Documentation
            </Link>
            <Link href="/install" className="text-sm text-muted-foreground hover:text-primary">
              Install
            </Link>
            <Button asChild variant="default">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <GitLogo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 mb-4">
            Welcome to ImportBot
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Seamlessly import your projects from various sources and manage your repositories with ease.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
            >
              <Link href="/install">
                Install ImportBot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <Github className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">GitHub Integration</h3>
            <p className="text-gray-400">
              Seamlessly connect with GitHub repositories and manage your projects with ease.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <GitLogo />
            <h3 className="text-xl font-semibold mb-2">Git Support</h3>
            <p className="text-gray-400">Full Git support with branch management, commit history, and more.</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <GithubLogo />
            <h3 className="text-xl font-semibold mb-2">Easy Installation</h3>
            <p className="text-gray-400">Quick and simple installation process with comprehensive documentation.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

