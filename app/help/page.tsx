import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const faqItems = [
  {
    question: "How do I get started with ImportBot?",
    answer:
      "To get started with ImportBot, first install it using our installation guide. Then, validate your GitHub token and you'll be ready to import your first repository.",
  },
  {
    question: "What types of repositories can I import?",
    answer:
      "ImportBot supports importing repositories from GitHub, GitLab, and Bitbucket. You can also import from ZIP files or direct URLs.",
  },
  {
    question: "Is ImportBot free to use?",
    answer:
      "ImportBot offers a free tier with basic features. For advanced features and higher usage limits, check out our pricing page for paid plans.",
  },
  {
    question: "How secure is my data with ImportBot?",
    answer:
      "We take security seriously. All data is encrypted in transit and at rest. We never store your GitHub tokens or sensitive repository information.",
  },
  {
    question: "Can I use ImportBot with my team?",
    answer:
      "Yes! ImportBot offers team collaboration features. You can invite team members and manage permissions for your imported repositories.",
  },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Help & FAQ</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about ImportBot</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

