import Link from "next/link"
import Image from "next/image"

const partners = [
  { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" },
  { name: "Railway", logo: "https://railway.app/brand/logo-light.png" },
  { name: "Heroku", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg" },
]

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="col-span-1 flex justify-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={100}
                height={40}
                objectFit="contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-500">
              Terms of Service
            </Link>
            <a href="https://github.com/sheikh-developer/ImportBot" className="text-gray-400 hover:text-gray-500">
              GitHub
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">&copy; 2023 ImportBot. All rights reserved.</p>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
              alt="Powered by Vercel"
              width={212}
              height={44}
              onError={(e) => {
                e.currentTarget.src = "/vercel-logo-placeholder.svg"
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

