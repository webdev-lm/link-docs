import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function RegulatoryGuidelinesMain() {
  const comingSoonItems = [
    { title: "SMS Guidelines" },
    { title: "WhatsApp Guidelines" },
    { title: "RCS Guidelines" },
  ]

  return (
    <div className="typo-app max-w-screen-lg mx-auto space-y-8">
      <h1>Regulatory Guidelines</h1>

      <div className="grid gap-4 sm:grid-cols-2 min-h-[400px]">
        <Link href="/regulatory-guidelines/sender-id" className="block">
          <Card className="h-full transition-colors hover:bg-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Sender ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Guidelines and requirements for sender ID registration.
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
