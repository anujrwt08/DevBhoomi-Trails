import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import {
  MapPin,
  Mountain,
  Waves,
  TreePine,
  Star,
  ArrowRight,
  ChevronDown,
  Heart,
  Utensils,
  Music,
  Compass,
  Calendar,
  Wallet,
} from 'lucide-react';

// ─── Fade-in on scroll ───────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Destination card ────────────────────────────────────────────────────────
function DestCard({
  image,
  title,
  subtitle,
  tag,
  className = '',
  large = false,
}: {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  className?: string;
  large?: boolean;
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
    >
      <div className={`relative overflow-hidden ${large ? 'h-[420px]' : 'h-[240px]'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        {/* Tag */}
        <span className="absolute top-3 left-3 bg-secondary text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
          {tag}
        </span>
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <Heart
            size={14}
            className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'}
          />
        </button>
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className={`text-white font-bold leading-tight ${large ? 'text-2xl' : 'text-lg'}`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>
          <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hidden Gem card ─────────────────────────────────────────────────────────
function GemCard({
  image,
  title,
  desc,
  badge,
}: {
  image: string;
  title: string;
  desc: string;
  badge: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {badge}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-white text-xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Experience card ─────────────────────────────────────────────────────────
function ExpCard({
  image,
  icon: Icon,
  title,
  desc,
  color,
}: {
  image: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${color} opacity-30`} />
      </div>
      <div className="p-5">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
          <Icon size={18} className="text-white" />
        </div>
        <h3
          className="font-bold text-foreground text-lg mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('moderate');

  return (
    <>
      <title>DevBhoomi Trails — Explore Uttarakhand Like a Local</title>
      <meta
        name="description"
        content="Discover hidden gems, authentic experiences, and the soul of Uttarakhand. Plan your perfect Himalayan journey with DevBhoomi Trails."
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="Uttarakhand Himalayan landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <Star size={12} className="fill-secondary text-secondary" />
              Uttarakhand's Most Authentic Travel Guide
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-5 max-w-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore Uttarakhand
              <br />
              <span className="text-secondary">Like a Local</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Beyond the tourist trail — discover hidden valleys, ancient temples,
              and the true spirit of Devbhoomi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-secondary/90 transition-all hover:scale-105 text-sm"
              >
                <Compass size={16} />
                Explore Places
              </Link>
              <Link
                to="/plan-trip"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/25 transition-all text-sm"
              >
                <Calendar size={16} />
                Plan My Trip
              </Link>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={28} className="text-white/60" />
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 pb-8">
            <div className="hidden md:flex justify-center gap-10">
              {[
                { value: '200+', label: 'Destinations' },
                { value: '50+', label: 'Hidden Gems' },
                { value: '30+', label: 'Local Experiences' },
                { value: '10K+', label: 'Happy Travelers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-bold text-secondary"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS (Bento Grid) ───────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                  Discover
                </span>
                <h2
                  className="text-4xl md:text-5xl font-bold text-foreground mt-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Featured Destinations
                </h2>
              </div>
              <Link
                to="/explore"
                className="hidden md:flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card */}
            <FadeIn delay={0.05} className="md:col-span-2 md:row-span-2">
              <DestCard
                image="/airo-assets/images/destinations/kedarnath-temple"
                title="Kedarnath Temple"
                subtitle="Rudraprayag, Uttarakhand"
                tag="Sacred"
                large
                className="h-full"
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <DestCard
                image="/airo-assets/images/destinations/nainital-lake"
                title="Nainital Lake"
                subtitle="Kumaon Hills"
                tag="Lakes"
              />
            </FadeIn>

            <FadeIn delay={0.15}>
              <DestCard
                image="/airo-assets/images/destinations/waterfall-uttarakhand"
                title="Forest Waterfalls"
                subtitle="Garhwal Region"
                tag="Nature"
              />
            </FadeIn>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FadeIn delay={0.2}>
              <DestCard
                image="/airo-assets/images/destinations/village-uttarakhand"
                title="Himalayan Villages"
                subtitle="Chamoli, Uttarakhand"
                tag="Villages"
              />
            </FadeIn>

            <FadeIn delay={0.25} className="md:col-span-2">
              <div className="h-[240px] rounded-2xl bg-primary flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <Mountain size={300} className="text-white absolute -right-10 -bottom-10" />
                </div>
                <div className="relative z-10 text-center">
                  <p
                    className="text-secondary text-sm font-semibold uppercase tracking-widest mb-2"
                  >
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {[
                      { icon: Mountain, label: 'Mountains' },
                      { icon: Star, label: 'Temples' },
                      { icon: Waves, label: 'Waterfalls' },
                      { icon: TreePine, label: 'Forests' },
                      { icon: MapPin, label: 'Villages' },
                    ].map(({ icon: Icon, label }) => (
                      <Link
                        key={label}
                        to="/explore"
                        className="flex items-center gap-2 bg-white/10 hover:bg-secondary hover:text-primary text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      >
                        <Icon size={14} />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HIDDEN GEMS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a1f14] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                Off the Beaten Path
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Hidden Gems of Uttarakhand
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">
                Places the guidebooks don't tell you about. Quiet, pristine, and
                waiting to be discovered by the curious traveler.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FadeIn delay={0.05}>
              <GemCard
                image="/airo-assets/images/hidden-gems/chopta-valley"
                title="Chopta Valley"
                desc="The 'Mini Switzerland of India' — untouched meadows and the world's highest Shiva temple."
                badge="Altitude Trek"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <GemCard
                image="/airo-assets/images/hidden-gems/rishikesh-ghats"
                title="Rishikesh Ghats at Dawn"
                desc="Before the crowds arrive, the Ganges glows golden. A spiritual experience unlike any other."
                badge="Spiritual"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <GemCard
                image="/airo-assets/images/destinations/village-uttarakhand"
                title="Munsiyari Village"
                desc="A remote Kumaoni village with panoramic views of the Panchachuli peaks. Barely on the map."
                badge="Remote"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <Link
                to="/hidden-gems"
                className="inline-flex items-center gap-2 border border-secondary text-secondary font-semibold px-8 py-3.5 rounded-full hover:bg-secondary hover:text-primary transition-all text-sm"
              >
                Discover All Hidden Gems <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LOCAL EXPERIENCES ─────────────────────────────────────────────── */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                Immerse Yourself
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-foreground mt-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Local Experiences
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FadeIn delay={0.05}>
              <ExpCard
                image="/airo-assets/images/experiences/local-food"
                icon={Utensils}
                title="Food & Cuisine"
                desc="Garhwali thali, kafal berries, and chai brewed over wood fire."
                color="bg-amber-600"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <ExpCard
                image="/airo-assets/images/experiences/festival"
                icon={Music}
                title="Festivals"
                desc="Kumbh Mela, Nanda Devi Raj Jat, and village harvest celebrations."
                color="bg-rose-600"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <ExpCard
                image="/airo-assets/images/destinations/village-uttarakhand"
                icon={Star}
                title="Culture & Craft"
                desc="Ringal bamboo crafts, Aipan art, and Pahari folk music traditions."
                color="bg-primary"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ExpCard
                image="/airo-assets/images/hidden-gems/chopta-valley"
                icon={Compass}
                title="Adventure"
                desc="Trekking, river rafting, camping under Himalayan stars."
                color="bg-accent"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <div className="text-center mt-10">
              <Link
                to="/experiences"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all text-sm"
              >
                Explore All Experiences <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TRIP PLANNER CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Mountain silhouette bg */}
        <div className="absolute inset-0 opacity-[0.04]">
          <Mountain size={600} className="text-primary absolute left-1/2 -translate-x-1/2 bottom-0" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                Your Journey Awaits
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Plan Your Perfect
                <br />
                Uttarakhand Trip
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed">
                Tell us how many days you have and your budget — we'll craft a
                personalized itinerary just for you.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-card border border-border rounded-3xl p-8 shadow-lg max-w-xl mx-auto">
                {/* Days selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3 text-left">
                    How many days?
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[3, 5, 7, 10, 14].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          days === d
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground hover:bg-primary/10'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-3 text-left">
                    Budget range
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'budget', label: 'Budget', sub: '< ₹5K/day' },
                      { key: 'moderate', label: 'Moderate', sub: '₹5–10K/day' },
                      { key: 'luxury', label: 'Luxury', sub: '₹10K+/day' },
                    ].map((b) => (
                      <button
                        key={b.key}
                        onClick={() => setBudget(b.key)}
                        className={`flex flex-col items-center py-3 px-2 rounded-xl border text-sm transition-colors ${
                          budget === b.key
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40'
                        }`}
                      >
                        <Wallet size={16} className="mb-1" />
                        <span className="font-semibold">{b.label}</span>
                        <span className="text-xs opacity-70">{b.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to="/plan-trip"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] text-sm"
                >
                  <Calendar size={16} />
                  Generate My Itinerary
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ─────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '"Chopta was a revelation. No crowds, just mountains and silence. DevBhoomi Trails made it happen."',
                name: 'Priya Sharma',
                from: 'Delhi',
              },
              {
                quote:
                  '"The local food guide was incredible — I ate things I never would have found on my own."',
                name: 'Arjun Mehta',
                from: 'Mumbai',
              },
              {
                quote:
                  '"The 7-day itinerary was perfectly balanced between adventure and culture. Highly recommend!"',
                name: 'Kavya Nair',
                from: 'Bangalore',
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p
                    className="text-white/80 text-sm leading-relaxed mb-4 italic"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t.quote}
                  </p>
                  <p className="text-secondary font-semibold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.from}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
