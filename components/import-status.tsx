import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function ImportStatus({ status }: { status: string }) {
  return (
    <Alert>
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Import Successful</AlertTitle>
      <AlertDescription>{status}</AlertDescription>
    </Alert>
  )
}

