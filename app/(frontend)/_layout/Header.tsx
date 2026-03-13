import LinkLogo from "@/_components/_atoms/_brand/LinkLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 h-16 bg-white border-b border-gray-200 items-center flex flex-wrap justify-between">
  
          <Link href="/" className=" flex items-center content-center space-x-4">
            <LinkLogo className="h-6 w-auto" />
            <span className="text-lg font-semibold ">Docs</span>
          </Link>
            
  
        <nav>
        <ul className="flex items-center content-center space-x-4 px-4 w-full justify-end ">
            <li className="cursor-default">Product Guides</li>
            <li className="cursor-default">API Reference</li>
            <li className="cursor-default">Help & Support</li>
            <li>
              <Link href="/regulatory-guidelines" className="hover:text-accent">Regulatory Guidelines</Link>
            </li>
        </ul>
        </nav>
        <div>
            <Button>Login</Button>
        </div>

    </header>
  )
}