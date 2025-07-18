import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Speakers", href: location.pathname === "/" ? "#speakers" : "/#speakers" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: location.pathname === "/" ? "#gallery" : "/#gallery" },
    { label: "Partners", href: location.pathname === "/" ? "#partners" : "/#partners" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // If it's an anchor link and we're not on the home page, redirect to home first
    if (href.startsWith("/#") && location.pathname !== "/") {
      window.location.href = href;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-white">TEDx</span>
          <span className="text-red-600">HBTU</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </a>
            )
          ))}
          <Button className="bg-red-600 hover:bg-red-700">
            Register
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-l border-white/10">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-300 hover:text-white text-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-300 hover:text-white text-lg transition-colors"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <Button className="bg-red-600 hover:bg-red-700">
                Register
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar; 