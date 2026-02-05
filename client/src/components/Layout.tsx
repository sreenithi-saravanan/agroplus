import { useLanguage } from "@/lib/LanguageContext";
import { Link, useLocation } from "wouter";
import { Menu, X, Leaf, Globe, Sprout } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, toggleLanguage, language } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/prices", label: t.nav.prices },
    { href: "/scan", label: t.nav.scan },
    { href: "/news", label: t.nav.news },
    { href: "/roadmap", label: "Roadmap" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-100 selection:text-green-900">
      <header className="sticky top-0 z-50 w-full border-b border-green-100/50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tighter text-green-950 hover:opacity-80 transition-opacity">
            <div className="bg-green-100 p-2 rounded-xl text-green-600">
              <Leaf className="h-6 w-6" />
            </div>
            <span>AgroPulse<span className="text-green-600">+</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium px-4 py-2 rounded-full transition-all duration-300 relative group overflow-hidden ${location === item.href
                    ? "text-green-700 bg-green-50 font-bold"
                    : "text-slate-600 hover:text-green-700 hover:bg-slate-50"
                  }`}
              >
                {item.label}
                {location === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full animate-in fade-in" />
                )}
              </Link>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <Button
              variant="default"
              size="sm"
              onClick={toggleLanguage}
              className="bg-green-900 hover:bg-green-800 text-white font-bold rounded-xl px-4 h-10 shadow-lg hover:shadow-green-900/20 transition-all"
            >
              <Globe className="mr-2 h-4 w-4" />
              {t.nav.toggle}
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-slate-700 hover:bg-slate-100 rounded-xl w-10 h-10"
            >
              <Globe className="h-5 w-5" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-100 rounded-xl w-12 h-12">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-green-100 w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-2 mt-8">
                  <div className="flex items-center gap-2 px-4 py-6 mb-4 border-b border-slate-100">
                    <Sprout className="h-6 w-6 text-green-600" />
                    <span className="font-bold text-xl text-green-950">Menu</span>
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium py-4 px-4 rounded-xl transition-all ${location === item.href
                          ? "bg-green-50 text-green-700 font-bold translate-x-2"
                          : "text-slate-600 hover:bg-slate-50 hover:translate-x-1"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500 min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 AgroPulse+. Empowering Farmers.</p>
        </div>
      </footer>
    </div>
  );
}
