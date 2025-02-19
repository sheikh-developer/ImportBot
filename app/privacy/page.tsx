import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Commitment to Your Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At ImportBot, we take your privacy seriously. This policy outlines how we collect, use, and protect your
            personal information.
          </p>
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, use our services, or
            contact us for support.
          </p>
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p className="mb-4">
            We use your information to provide, maintain, and improve our services, as well as to communicate with you
            about your account and our services.
          </p>
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>
          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you have any questions or
            concerns about our privacy practices, please contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

