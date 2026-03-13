import LinkLogo from "@/_components/_atoms/_brand/LinkLogo";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 h-16 bg-white border-b border-gray-200 items-center flex flex-wrap justify-between">
  
          <Link href="/" className=" flex items-center content-center space-x-4">
            <LinkLogo className="h-6 w-auto" />
            <span className="text-lg font-semibold ">Docs</span>
          </Link>
            
          <div className="h-8 rounded-full bg-secondary w-64 flex items-center space-x-2 px-2"><SearchIcon className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Search Docs</span></div>
        <nav>
         
        <ul className="flex items-center content-center space-x-6 px-4 w-full justify-end text-sm">
            <li className="cursor-default">Product Guides</li>
            <li className="cursor-default">API Reference</li>
            <li className="cursor-default">Help & Support</li>
            <li>
              <Link href="/regulatory-guidelines" className="hover:text-accent">Regulatory Guidelines</Link>
            </li>
        </ul>
        </nav>
        <div>
            <Button size="sm" variant="link" className="text-sm text-accent font-semibold">Sign Up</Button>
        </div>

    </header>
  )
}