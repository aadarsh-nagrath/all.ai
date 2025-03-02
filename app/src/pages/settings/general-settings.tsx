import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

// const models = [
//   {
//     name: "Model 1",
//     logo: "https://example.com/logo1.png",
//     version: "1.0",
//   },
//   {
//     name: "Model 2",
//     logo: "https://example.com/logo2.png",
//     version: "2.0",
//   },
// ]

export default function Settings() {
  const [storeName, setStoreName] = React.useState("")

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Removed Header section */}
      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="text-muted-foreground grid gap-4 text-sm">
            <a href="##" className="text-primary font-semibold">
              General
            </a>
            <a href="##">Security</a>
            <a href="##">Integrations</a>
            <a href="##">Support</a>
            <a href="##">Organizations</a>
            <a href="##">Advanced</a>
          </nav>
          <div className="grid gap-6">
            {/* Store Name Card */}
            <Card>
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input
                    placeholder="Store Name"
                    value={storeName}
                    onChange={handleStoreNameChange}
                  />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>

            {/* Plugins Directory Card */}
            <Card>
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input placeholder="Project Name" defaultValue="/content/plugins" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" checked={true} />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
