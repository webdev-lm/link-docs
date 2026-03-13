import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"



export default async function ProductGuidesMain() {
  const comingSoonItems = [
    { title: "Product Guides" },
    { title: "API Reference" },
    { title: "Help & Support" },
  ]

  return (
    <div className="px-4 space-y-16">
      <div className="pt-32 px-4 max-w-screen-md">
      <h1>LINK Mobility Docs</h1>
      <p>Learn how to build, deploy, and scale your communications with LINK Mobility. Explore our products with our documentation's technical walkthroughs, example code, reference information for our APIs, regulatory guidelines, and more.</p>
      </div>
      <div className="px-4">
        <h2>Getting Started</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {comingSoonItems.map((item) => (
          <Card key={item.title} className="h-full opacity-90 h-48">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{item.title}</CardTitle>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Documentation coming soon.
              </p>
            </CardContent>
          </Card>
        ))}
        <Link href="/regulatory-guidelines" className="block">
        <Card className="h-full transition-colors hover:bg-secondary/20 hover:ring-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Regulatory Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="relative h-full">
              <p className="text-sm text-muted-foreground">
                Guidelines and requirements for regulatory compliance. Learn more about the regulatory requirements for sending SMS, WhatsApp, and RCS messages in different countries.
              </p>
              <span className="text-sm text-accent absolute bottom-0 left-4 flex items-center space-x-4">Learn More <ArrowRightIcon className="ml-2 w-4 h-4" /></span>
            </CardContent>
          </Card>
        </Link>
        </div>
      </div>
    </div>
  )
}
