import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Heart, Star, ArrowRight, Eye, Clock, TrendingDown } from 'lucide-react';

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

const gems = [
  {
    id: 1,
    title: 'Chopta Valley',
    location: 'Rudraprayag District',
    image: '/airo-assets/images/hidden-gems/chopta-valley',
    badge: 'Altitude Trek',
    badgeColor: 'bg-accent',
    crowd: 'Very Low',
    bestTime: 'Apr – Jun, Sep – Nov',
    rating: 4.9,
    desc: "Called the 'Mini Switzerland of India', Chopta is a pristine meadow at 2,680m. Home to Tungnath — the world's highest Shiva temple. Barely touched by mass tourism.",
    highlights: ['Tungnath Temple', 'Chandrashila Peak', 'Rhododendron Forests', 'Himalayan Panorama'],
    tip: 'Stay at a local homestay in Sari village for the most authentic experience.',
  },
  {
    id: 2,
    title: 'Munsiyari',
    location: 'Pithoragarh District',
    image: '/airo-assets/images/hidden-gems/munsiyari',
    badge: 'Remote Village',
    badgeColor: 'bg-primary',
    crowd: 'Very Low',
    bestTime: 'Mar – Jun, Sep – Nov',
    rating: 4.8,
    desc: "A remote Kumaoni village perched at 2,200m with jaw-dropping views of the Panchachuli peaks. The gateway to Milam and Ralam glaciers — barely on the tourist map.",
    highlights: ['Panchachuli Views', 'Milam Glacier Trek', 'Tribal Culture', 'Birthi Falls'],
    tip: 'Hire a local guide from the village — they know trails that no map shows.',
  },
  {
    id: 3,
    title: 'Binsar Wildlife Sanctuary',
    location: 'Almora District',
    image: '/airo-assets/images/hidden-gems/binsar',
    badge: 'Forest Retreat',
    badgeColor: 'bg-emerald-700',
    crowd: 'Low',
    bestTime: 'Year Round',
    rating: 4.7,
    desc: "Dense oak and rhododendron forests at 2,400m with 360° views of the Himalayan range. A birder's paradise with over 200 species. Peaceful, quiet, and utterly beautiful.",
    highlights: ['Zero Point Viewpoint', '200+ Bird Species', 'Oak Forests', 'Himalayan Views'],
    tip: 'Visit at sunrise for the most spectacular mountain views from Zero Point.',
  },
  {
    id: 4,
    title: 'Rishikesh Ghats at Dawn',
    location: 'Rishikesh',
    image: '/airo-assets/images/hidden-gems/rishikesh-ghats',
    badge: 'Spiritual',
    badgeColor: 'bg-amber-600',
    crowd: 'Low (at dawn)',
    bestTime: 'Oct – Mar',
    rating: 4.8,
    desc: "Before the crowds arrive, the Ganges glows golden and the ghats are silent except for temple bells. A spiritual experience that the tourist brochures can't capture.",
    highlights: ['Ganga Aarti', 'Silent Ghats', 'Sunrise Ritual', 'Local Ashrams'],
    tip: 'Arrive by 5:30 AM. The 45 minutes before sunrise are pure magic.',
  },
  {
    id: 5,
    title: 'Kausani Village',
    location: 'Bageshwar District',
    image: '/airo-assets/images/destinations/village-uttarakhand',
    badge: 'Panoramic',
    badgeColor: 'bg-primary',
    crowd: 'Low',
    bestTime: 'Oct – Jun',
    rating: 4.7,
    desc: "Mahatma Gandhi called it the 'Switzerland of India'. A quiet hilltop village with unobstructed views of Trishul, Nanda Devi, and Panchachuli peaks. Organic tea gardens surround it.",
    highlights: ['Nanda Devi Views', 'Tea Gardens', 'Anasakti Ashram', 'Sunset Point'],
    tip: 'Stay 2 nights — the second morning is always clearer than the first.',
  },
  {
    id: 6,
    title: 'Deoria Tal Lake',
    location: 'Rudraprayag District',
    image: '/airo-assets/images/hidden-gems/chopta-valley',
    badge: 'Hidden Lake',
    badgeColor: 'bg-teal-700',
    crowd: 'Very Low',
    bestTime: 'Apr – Jun, Sep – Nov',
    rating: 4.9,
    desc: "A pristine high-altitude lake at 2,438m that perfectly mirrors the Chaukhamba peaks. A 3km trek from Sari village. Camping here under the stars is unforgettable.",
    highlights: ['Mirror Lake', 'Chaukhamba Reflection', 'Camping', 'Stargazing'],
    tip: 'Camp overnight — the reflection of the peaks in the still morning water is breathtaking.',
  },
];

function GemCard({ gem }: { gem: typeof gems[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={gem.image} alt={gem.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 ${gem.badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>{gem.badge}</span>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
            <TrendingDown size={11} /> {gem.crowd} Crowd
          </span>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
            <Clock size={11} /> {gem.bestTime}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-foreground text-xl leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>{gem.title}</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-0.5"><MapPin size={12} />{gem.location}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-secondary text-secondary" />
            <span className="text-sm font-semibold">{gem.rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{gem.desc}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {gem.highlights.map(h => (
            <span key={h} className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">{h}</span>
          ))}
        </div>

        {/* Local tip */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-secondary/10 border border-secondary/20 rounded-xl p-3 mb-4"
          >
            <p className="text-xs font-semibold text-secondary mb-1">Local Tip</p>
            <p className="text-xs text-foreground/80 leading-relaxed">{gem.tip}</p>
          </motion.div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-primary transition-colors"
          >
            <Eye size={13} /> {expanded ? 'Hide' : 'Local Tip'}
          </button>
          <Link to="/plan-trip" className="ml-auto flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
            Plan Visit <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function HiddenGemsPage() {
  return (
    <>
      <title>Hidden Gems of Uttarakhand — DevBhoomi Trails</title>
      <meta name="description" content="Discover Uttarakhand's best-kept secrets — less crowded, more authentic, and utterly breathtaking." />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0a1f14] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/airo-assets/images/hidden-gems/chopta-valley" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/70 to-[#0a1f14]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Off the Beaten Path</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Hidden Gems of<br />Uttarakhand
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              Places the guidebooks don't tell you about. Quiet, pristine, and waiting to be discovered by the curious traveler.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: TrendingDown, label: 'Low Crowd Spots', value: '50+' },
                { icon: Star, label: 'Avg. Rating', value: '4.8' },
                { icon: MapPin, label: 'Districts Covered', value: '13' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gems grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>All Hidden Gems</h2>
                <p className="text-muted-foreground text-sm mt-1">Click "Local Tip" on any card for insider advice</p>
              </div>
              <span className="text-sm text-muted-foreground">{gems.length} places</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gems.map((gem, i) => (
              <FadeIn key={gem.id} delay={i * 0.06}>
                <GemCard gem={gem} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to explore the unexplored?
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">Build a custom itinerary around these hidden gems and travel like a true local.</p>
            <Link to="/plan-trip" className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-secondary/90 transition-all text-sm">
              Plan My Hidden Gem Trip <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
