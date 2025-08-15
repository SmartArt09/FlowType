import Link from 'next/link';
import { Keyboard } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Keyboard className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tighter">TypeFlow</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
             <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
             </Link>
             <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
             </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
