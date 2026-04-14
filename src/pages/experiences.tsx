import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Utensils, Music, Star, Compass, Heart, ArrowRight,
  Clock, MapPin, Users, ChevronDown, ChevronUp, Calendar
} from 'lucide-react';

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

const categories = [
  { key: 'all', label: 'All Experiences' },
  { key: 'food', label: 'Food & Cuisine' },
  { key: 'spiritual', label: 'Spiritual' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'culture', label: 'Culture & Craft' },
  { key: 'festivals', label: 'Festivals' },
];

const experiences = [
  {
    id: 1,
    category: 'food',
    title: 'Garhwali Thali Cooking Class',
    location: 'Rishikesh',
    image: '/airo-assets/images/experiences/local-food',
    icon: Utensils,
    color: 'bg-amber-600',
    duration: '3 hours',
    groupSize: 'Up to 8',
    season: 'Year Round',
    rating: 4.9,
    reviews: 312,
    price: '₹1,200',
    desc: 'Learn to cook an authentic Garhwali thali with a local family. Mandua roti, kafal chutney, chainsoo dal, and more — all from scratch using mountain ingredients.',
    highlights: ['Home kitchen setting', 'Local family host', 'Recipe booklet included', 'Vegetarian & vegan options'],
  },
  {
    id: 2,
    category: 'spiritual',
    title: 'Ganga Aarti at Triveni Ghat',
    location: 'Rishikesh',
    image: '/airo-assets/images/hidden-gems/rishikesh-ghats',
    icon: Star,
    color: 'bg-amber-500',
    duration: '1.5 hours',
    groupSize: 'Open',
    season: 'Year Round',
    rating: 4.9,
    reviews: 2840,
    price: 'Free',
    desc: 'Witness the nightly Ganga Aarti ceremony as priests perform fire rituals on the banks of the sacred river. One of the most spiritually moving experiences in India.',
    highlights: ['Sunset timing', 'Priest-led ceremony', 'Flower offering ritual', 'Photography allowed'],
  },
  {
    id: 3,
    category: 'adventure',
    title: 'White Water Rafting — Grade IV',
    location: 'Rishikesh',
    image: '/airo-assets/images/experiences/river-rafting',
    icon: Compass,
    color: 'bg-blue-600',
    duration: '4 hours',
    groupSize: '6–8 per raft',
    season: 'Sep – Jun',
    rating: 4.8,
    reviews: 1920,
    price: '₹1,800',
    desc: 'Tackle the legendary rapids of the Ganges — from the thrilling "Golf Course" to "The Wall". Suitable for beginners with guides. One of Asia\'s best rafting destinations.',
    highlights: ['Grade II–IV rapids', 'Certified guides', 'Safety gear provided', 'Cliff jumping optional'],
  },
  {
    id: 4,
    category: 'spiritual',
    title: 'Sunrise Yoga at the Ganges',
    location: 'Rishikesh',
    image: '/airo-assets/images/experiences/yoga-rishikesh',
    icon: Star,
    color: 'bg-rose-500',
    duration: '2 hours',
    groupSize: 'Up to 12',
    season: 'Year Round',
    rating: 4.9,
    reviews: 876,
    price: '₹800',
    desc: 'Start your day with a traditional Hatha yoga session on the banks of the Ganges as the sun rises over the Himalayas. Led by a certified local yogi.',
    highlights: ['Riverside setting', 'All levels welcome', 'Meditation included', 'Yoga mat provided'],
  },
  {
    id: 5,
    category: 'festivals',
    title: 'Nanda Devi Raj Jat Yatra',
    location: 'Chamoli District',
    image: '/airo-assets/images/experiences/festival',
    icon: Music,
    color: 'bg-rose-600',
    duration: '3–4 days',
    groupSize: 'Open',
    season: 'Aug – Sep (every 12 yrs)',
    rating: 5.0,
    reviews: 420,
    price: 'Free',
    desc: 'The world\'s largest Himalayan pilgrimage — a 280km journey through remote mountain villages. Witness thousands of devotees, folk music, and ancient rituals.',
    highlights: ['Once in 12 years', 'Ancient pilgrimage route', 'Folk music & dance', 'Mountain villages'],
  },
  {
    id: 6,
    category: 'culture',
    title: 'Aipan Art Workshop',
    location: 'Almora',
    image: '/airo-assets/images/destinations/village-uttarakhand',
    icon: Star,
    color: 'bg-primary',
    duration: '2.5 hours',
    groupSize: 'Up to 10',
    season: 'Year Round',
    rating: 4.7,
    reviews: 198,
    price: '₹950',
    desc: 'Learn Aipan — the ancient Kumaoni folk art of geometric patterns drawn with rice paste. A UNESCO-recognized tradition passed down through generations of women.',
    highlights: ['Local artisan teacher', 'Take your artwork home', 'Cultural history session', 'All materials provided'],
  },
  {
    id: 7,
    category: 'adventure',
    title: 'Chandrashila Summit Trek',
    location: 'Chopta, Rudraprayag',
    image: '/airo-assets/images/hidden-gems/chopta-valley',
    icon: Compass,
    color: 'bg-accent',
    duration: 'Full day',
    groupSize: 'Up to 15',
    season: 'Apr – Jun, Sep – Nov',
    rating: 4.9,
    reviews: 654,
    price: '₹2,500',
    desc: 'Trek to Chandrashila Peak (3,679m) via Tungnath — the world\'s highest Shiva temple. 360° views of Nanda Devi, Trishul, Kedarnath, and Chaukhamba peaks.',
    highlights: ['World\'s highest Shiva temple', '360° Himalayan views', 'Experienced guide', 'Packed lunch included'],
  },
  {
    id: 8,
    category: 'food',
    title: 'Village Food Walk — Kumaon',
    location: 'Kausani',
    image: '/airo-assets/images/hidden-gems/munsiyari',
    icon: Utensils,
    color: 'bg-amber-600',
    duration: '3 hours',
    groupSize: 'Up to 6',
    season: 'Year Round',
    rating: 4.8,
    reviews: 143,
    price: '₹1,500',
    desc: 'Walk through a traditional Kumaoni village with a local guide, tasting seasonal foods — bhang ki chutney, bal mithai, singori sweets, and freshly brewed buransh juice.',
    highlights: ['Small group only', 'Local guide', '6–8 tastings', 'Visit organic farms'],
  },
];

function ExpCard({ exp }: { exp: typeof experiences[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const Icon = exp.icon;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-card rounded-2xl overflow-hidden border border-border group"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute top-3 left-3 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center`}>
          <Icon size={14} className="text-white" />
        </div>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-400 text-red-400' : 'text-white'} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={10} /> {exp.duration}
          </span>
          <span className="bg-secondary text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">{exp.price}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-foreground text-lg leading-tight pr-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {exp.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-secondary text-secondary" />
            <span className="text-sm font-semibold">{exp.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Users size={11} />{exp.groupSize}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={11} />{exp.season}</span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{exp.desc}</p>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-3"
          >
            <p className="text-xs font-semibold text-foreground mb-2">What's included:</p>
            <div className="flex flex-wrap gap-1.5">
              {exp.highlights.map(h => (
                <span key={h} className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">{h}</span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-medium text-accent hover:text-primary transition-colors"
          >
            {expanded ? <><ChevronUp size={13} /> Less</> : <><ChevronDown size={13} /> Details</>}
          </button>
          <Link
            to="/plan-trip"
            className="ml-auto flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            Book Now <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = experiences.filter(e => activeCategory === 'all' || e.category === activeCategory);

  return (
    <>
      <title>Local Experiences in Uttarakhand — DevBhoomi Trails</title>
      <meta name="description" content="Immerse yourself in Uttarakhand's culture — cooking classes, yoga, river rafting, festivals, and more authentic local experiences." />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="/airo-assets/images/experiences/yoga-rishikesh" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Immerse Yourself</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Local Experiences
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Go beyond sightseeing. Cook with locals, trek sacred peaks, learn ancient crafts, and witness festivals that have existed for centuries.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { value: '30+', label: 'Experiences' },
                { value: '4.8★', label: 'Avg. Rating' },
                { value: '100%', label: 'Local Hosts' },
                { value: '5K+', label: 'Happy Guests' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-secondary" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[64px] z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat.label}
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
              <span className="font-semibold text-foreground">{filtered.length}</span> experiences available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 0.05}>
                <ExpCard exp={exp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Want a curated experience itinerary?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We'll combine the best local experiences with your travel dates and budget.
            </p>
            <Link
              to="/plan-trip"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all text-sm"
            >
              Plan My Experience Trip <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
