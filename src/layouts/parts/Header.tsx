import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Mountain } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/hidden-gems', label: 'Hidden Gems' },
    { href: '/plan-trip', label: 'Plan Trip' },
    { href: '/experiences', label: 'Experiences' },
  ];

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#0f2318]/95 backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 py-4 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Mountain size={16} className="text-primary" />
            </div>
            <span
              className="font-heading text-lg font-bold tracking-wide text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DevBhoomi Trails
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-secondary ${
                  location.pathname === item.href
                    ? 'text-secondary'
                    : 'text-white/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Wishlist + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-secondary transition-colors text-sm font-medium"
            >
              <Heart size={16} />
              <span>Wishlist</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f2318] border-t border-white/10 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors py-2.5 px-2 rounded-md hover:bg-white/10 ${
                    location.pathname === item.href
                      ? 'text-secondary'
                      : 'text-white/80'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-secondary py-2.5 px-2 mt-1 border-t border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={15} />
                Wishlist
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
