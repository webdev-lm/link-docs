
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ProductGuidesMain() {

  const comingSoonItems = [
    { title: "MyLINK Studio" },
    { title: "MyLINK Connect" },
    { title: "MyLINK Marketingplatform" },
    { title: "MyLINK Engage" },
    { title: "MyLINK APIs (Legacy)" },
  ]

  return (
    <div className="typo-app max-w-screen-lg mx-auto space-y-8 mt-16">
      <h1>Product Guides</h1>

      <div className="grid gap-4 sm:grid-cols-2 min-h-[400px]">
        <Link href="/product-guides/mylink-portal" className="block">
          <Card className="h-full transition-colors hover:bg-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>MyLINK Portal 2.0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn more about the new MyLINK Portal 2.0 and how to use it to manage your account.
              </p>
            </CardContent>
          </Card>
        </Link>

        {comingSoonItems.map((item) => (
          <Card key={item.title} className="h-full opacity-90">
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
      </div>
    </div>
  )
}
