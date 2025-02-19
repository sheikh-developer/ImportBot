import type React from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type AdvancedOptionsProps = {
  options: {
    isPrivate: boolean
    enableBranchProtection: boolean
    enableDependabot: boolean
  }
  setOptions: React.Dispatch<
    React.SetStateAction<{
      isPrivate: boolean
      enableBranchProtection: boolean
      enableDependabot: boolean
    }>
  >
}

export default function AdvancedOptions({ options, setOptions }: AdvancedOptionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Advanced Options</h3>
      <div className="flex items-center space-x-2">
        <Switch
          id="private-repo"
          checked={options.isPrivate}
          onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, isPrivate: checked }))}
        />
        <Label htmlFor="private-repo">Private Repository</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="branch-protection"
          checked={options.enableBranchProtection}
          onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, enableBranchProtection: checked }))}
        />
        <Label htmlFor="branch-protection">Enable Branch Protection</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="dependabot"
          checked={options.enableDependabot}
          onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, enableDependabot: checked }))}
        />
        <Label htmlFor="dependabot">Enable Dependabot</Label>
      </div>
    </div>
  )
}

