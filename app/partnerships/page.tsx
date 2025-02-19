import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const partners = [
  {
    name: "Vercel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
    description:
      "Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow.",
  },
  {
    name: "Railway",
    logo: "https://railway.app/brand/logo-light.png",
    description:
      "Railway is a deployment platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.",
  },
  {
    name: "Heroku",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
    description:
      "Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.",
  },
]

export default function PartnershipsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Partnerships</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <Card key={partner.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-16 mb-4">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={40}
                  objectFit="contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
              <CardTitle>{partner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{partner.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

