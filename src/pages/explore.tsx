import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Heart, Search, SlidersHorizontal, Mountain, Star, Waves, TreePine, Home, ArrowRight } from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const destinations = [
  { id: 1, title: 'Kedarnath Temple', location: 'Rudraprayag', category: 'Temples', image: '/airo-assets/images/destinations/kedarnath-temple', rating: 4.9, reviews: 2840, tag: 'Sacred', difficulty: 'Moderate Trek' },
  { id: 2, title: 'Valley of Flowers', location: 'Chamoli', category: 'Mountains', image: '/airo-assets/images/destinations/valley-of-flowers', rating: 4.8, reviews: 1920, tag: 'UNESCO', difficulty: 'Easy Trek' },
  { id: 3, title: 'Nainital Lake', location: 'Kumaon Hills', category: 'Lakes', image: '/airo-assets/images/destinations/nainital-lake', rating: 4.7, reviews: 3100, tag: 'Popular', difficulty: 'Easy' },
  { id: 4, title: 'Auli Ski Resort', location: 'Chamoli', category: 'Mountains', image: '/airo-assets/images/destinations/auli-skiing', rating: 4.8, reviews: 980, tag: 'Adventure', difficulty: 'Moderate' },
  { id: 5, title: 'Jim Corbett Park', location: 'Nainital District', category: 'Wildlife', image: '/airo-assets/images/destinations/jim-corbett', rating: 4.7, reviews: 2200, tag: 'Wildlife', difficulty: 'Easy' },
  { id: 6, title: 'Forest Waterfalls', location: 'Garhwal Region', category: 'Waterfalls', image: '/airo-assets/images/destinations/waterfall-uttarakhand', rating: 4.6, reviews: 760, tag: 'Nature', difficulty: 'Easy Trek' },
  { id: 7, title: 'Himalayan Villages', location: 'Chamoli', category: 'Villages', image: '/airo-assets/images/destinations/village-uttarakhand', rating: 4.9, reviews: 430, tag: 'Offbeat', difficulty: 'Easy' },
  { id: 8, title: 'Rishikesh Ghats', location: 'Rishikesh', category: 'Temples', image: '/airo-assets/images/hidden-gems/rishikesh-ghats', rating: 4.8, reviews: 4100, tag: 'Spiritual', difficulty: 'Easy' },
];

const categories = ['All', 'Mountains', 'Temples', 'Waterfalls', 'Villages', 'Wildlife', 'Lakes'];

function DestCard({ dest }: { dest: typeof destinations[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 16px 32px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-card rounded-2xl overflow-hidden border border-border group cursor-pointer"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 bg-secondary text-primary text-xs font-semibold px-2.5 py-1 rounded-full">{dest.tag}</span>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'} />
        </button>
        <span className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{dest.difficulty}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{dest.title}</h3>
        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3"><MapPin size={12} />{dest.location}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-secondary text-secondary" />
            <span className="text-sm font-semibold text-foreground">{dest.rating}</span>
            <span className="text-xs text-muted-foreground">({dest.reviews.toLocaleString()})</span>
          </div>
          <Link to="/plan-trip" className="text-xs font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
            Plan Visit <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <title>Explore Uttarakhand — DevBhoomi Trails</title>
      <meta name="description" content="Discover mountains, temples, waterfalls, villages and more across Uttarakhand. Filter by category and find your perfect destination." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/airo-assets/images/destinations/valley-of-flowers" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Discover</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Explore Uttarakhand
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                From sacred peaks to hidden valleys — find every corner of Devbhoomi.
              </p>
            </div>
          </FadeIn>

          {/* Search bar */}
          <FadeIn delay={0.1}>
            <div className="max-w-xl mx-auto mt-8">
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search destinations, regions..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 outline-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent"
                />
                <button className="flex items-center gap-1.5 text-xs font-medium text-primary border-l border-border pl-3">
                  <SlidersHorizontal size={14} /> Filter
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category tabs */}
      <section className="sticky top-[64px] z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat === 'Mountains' && <Mountain size={13} />}
                {cat === 'Temples' && <Star size={13} />}
                {cat === 'Waterfalls' && <Waves size={13} />}
                {cat === 'Villages' && <Home size={13} />}
                {cat === 'Wildlife' && <TreePine size={13} />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground text-sm">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> destinations
              {activeCategory !== 'All' && <span> in <span className="text-primary font-semibold">{activeCategory}</span></span>}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((dest, i) => (
                <FadeIn key={dest.id} delay={i * 0.05}>
                  <DestCard dest={dest} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No destinations found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Can't decide where to go?
            </h2>
            <p className="text-muted-foreground mb-6">Let us build a personalized itinerary based on your days and budget.</p>
            <Link to="/plan-trip" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all text-sm">
              Plan My Trip <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
