import LinkLogo from "@/_components/_atoms/_brand/LinkLogo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 h-16 bg-white border-b border-gray-200 items-center flex flex-wrap justify-between">
        <div className=" flex items-center content-center space-x-4
        ">

            <LinkLogo className="h-6 w-auto" />
            <span className="text-lg font-semibold ">Docs</span>
            
        </div>
        <nav>
        <ul className="flex items-center content-center space-x-4 px-4 w-full justify-end ">
            <li>Product Guides</li>
            <li>API Reference</li>
            <li>Help & Support</li>
            <li>Regulatory Guidelines</li>
        </ul>
        </nav>
        <div>
            <Button>Login</Button>
        </div>

    </header>
  )
}