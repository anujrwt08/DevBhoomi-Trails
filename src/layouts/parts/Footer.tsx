import { Link } from 'react-router-dom';
import { Mountain, Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a1f14] text-white/80">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Mountain size={16} className="text-primary" />
              </div>
              <span
                className="font-bold text-lg text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DevBhoomi Trails
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Explore Uttarakhand like a local. Discover hidden gems, authentic
              experiences, and the soul of the Himalayas.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Mountains', href: '/explore' },
                { label: 'Temples & Shrines', href: '/explore' },
                { label: 'Waterfalls', href: '/explore' },
                { label: 'Villages', href: '/explore' },
                { label: 'Hidden Gems', href: '/hidden-gems' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Plan Your Trip
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Trip Planner', href: '/plan-trip' },
                { label: 'Local Experiences', href: '/experiences' },
                { label: 'Food & Cuisine', href: '/experiences' },
                { label: 'Festivals', href: '/experiences' },
                { label: 'My Wishlist', href: '/wishlist' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Stay Inspired
            </h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Get hidden gems, travel tips, and seasonal guides delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2.5 border border-white/10 focus-within:border-secondary transition-colors">
                <Mail size={14} className="text-white/40 shrink-0" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none flex-1 min-w-0"
                />
              </div>
              <button
                type="submit"
                className="bg-secondary text-primary font-semibold text-sm py-2.5 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 DevBhoomi Trails. Made with love for Uttarakhand.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Use', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
