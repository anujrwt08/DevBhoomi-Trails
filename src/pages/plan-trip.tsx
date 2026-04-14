import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Wallet, MapPin, Sun, Mountain, Star, TreePine, CheckCircle2, ChevronRight, Clock, Users } from 'lucide-react';

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

type Itinerary = {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
};

function generateItinerary(days: number, budget: string, focus: string): Itinerary[] {
  const budgetLabel = budget === 'budget' ? 'Guesthouse' : budget === 'moderate' ? 'Boutique Hotel' : 'Heritage Resort';

  const allDays: Itinerary[] = [
    { day: 1, title: 'Arrive in Rishikesh', activities: ['Check-in and freshen up', 'Evening Ganga Aarti at Triveni Ghat', 'Stroll along the ghats', 'Dinner at a riverside café'], stay: `${budgetLabel}, Rishikesh`, meals: 'Dinner' },
    { day: 2, title: 'Rishikesh Adventure Day', activities: ['White water rafting on the Ganges', 'Bungee jumping or zip-lining', 'Visit Beatles Ashram', 'Yoga session at sunset'], stay: `${budgetLabel}, Rishikesh`, meals: 'Breakfast, Dinner' },
    { day: 3, title: 'Drive to Chopta', activities: ['Scenic drive through Devprayag', 'Stop at Rudraprayag confluence', 'Arrive Chopta meadows', 'Short nature walk'], stay: `${budgetLabel}, Chopta`, meals: 'Breakfast, Dinner' },
    { day: 4, title: 'Tungnath & Chandrashila Trek', activities: ['Early morning trek to Tungnath Temple', 'Summit Chandrashila Peak (3,679m)', 'Panoramic Himalayan views', 'Return to Chopta'], stay: `${budgetLabel}, Chopta`, meals: 'All meals' },
    { day: 5, title: 'Deoria Tal & Ukhimath', activities: ['Morning trek to Deoria Tal lake', 'Photograph the Chaukhamba reflection', 'Visit Ukhimath temple', 'Drive to Kedarnath base'], stay: `${budgetLabel}, Guptkashi`, meals: 'Breakfast, Dinner' },
    { day: 6, title: 'Kedarnath Pilgrimage', activities: ['Helicopter or trek to Kedarnath', 'Darshan at the ancient temple', 'Explore the valley', 'Return to base'], stay: `${budgetLabel}, Guptkashi`, meals: 'Breakfast' },
    { day: 7, title: 'Drive to Nainital', activities: ['Scenic drive through Kumaon hills', 'Arrive Nainital', 'Boat ride on Naini Lake', 'Mall Road evening walk'], stay: `${budgetLabel}, Nainital`, meals: 'Breakfast, Dinner' },
    { day: 8, title: 'Nainital & Mukteshwar', activities: ['Visit Naina Devi Temple', 'Drive to Mukteshwar', 'Apple orchards walk', 'Sunset at Chauli Ki Jali'], stay: `${budgetLabel}, Nainital`, meals: 'Breakfast, Dinner' },
    { day: 9, title: 'Jim Corbett Safari', activities: ['Morning jungle safari', 'Spot tigers, elephants, leopards', 'Afternoon nature walk', 'Campfire evening'], stay: `${budgetLabel}, Corbett`, meals: 'All meals' },
    { day: 10, title: 'Valley of Flowers', activities: ['Trek into the UNESCO valley', 'Photograph 500+ flower species', 'Hemkund Sahib visit', 'Return to Joshimath'], stay: `${budgetLabel}, Joshimath`, meals: 'Breakfast, Dinner' },
    { day: 11, title: 'Auli Skiing & Views', activities: ['Cable car to Auli', 'Skiing or snowboarding', 'Nanda Devi panorama', 'Local market visit'], stay: `${budgetLabel}, Auli`, meals: 'Breakfast, Dinner' },
    { day: 12, title: 'Binsar Sanctuary', activities: ['Drive to Binsar', 'Birding walk (200+ species)', 'Zero Point viewpoint', 'Sunset over Himalayan range'], stay: `${budgetLabel}, Binsar`, meals: 'All meals' },
    { day: 13, title: 'Munsiyari Village', activities: ['Arrive Munsiyari', 'Panchachuli peaks viewpoint', 'Visit Tribal Heritage Museum', 'Local village walk'], stay: `${budgetLabel}, Munsiyari`, meals: 'Breakfast, Dinner' },
    { day: 14, title: 'Departure Day', activities: ['Final morning in the mountains', 'Last views of the Himalayas', 'Drive back to Dehradun/Delhi', 'Carry memories forever'], stay: 'Departure', meals: 'Breakfast' },
  ];

  return allDays.slice(0, days);
}

const focuses = [
  { key: 'adventure', label: 'Adventure', icon: Mountain },
  { key: 'spiritual', label: 'Spiritual', icon: Star },
  { key: 'nature', label: 'Nature', icon: TreePine },
  { key: 'mixed', label: 'Mixed', icon: Sun },
];

const groupSizes = ['Solo', 'Couple', 'Family', 'Group (4+)'];

export default function PlanTripPage() {
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('moderate');
  const [focus, setFocus] = useState('mixed');
  const [groupSize, setGroupSize] = useState('Couple');
  const [itinerary, setItinerary] = useState<Itinerary[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setItinerary(generateItinerary(days, budget, focus));
      setLoading(false);
    }, 800);
  };

  const budgetEstimate = {
    budget: { daily: '₹2,000–4,000', total: `₹${(3000 * days).toLocaleString()}` },
    moderate: { daily: '₹5,000–8,000', total: `₹${(6500 * days).toLocaleString()}` },
    luxury: { daily: '₹12,000–20,000', total: `₹${(16000 * days).toLocaleString()}` },
  }[budget] ?? { daily: '', total: '' };

  return (
    <>
      <title>Plan Your Uttarakhand Trip — DevBhoomi Trails</title>
      <meta name="description" content="Build a personalized Uttarakhand itinerary based on your days, budget, and travel style." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/airo-assets/images/plan-trip/hero" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Your Journey</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Plan Your Perfect Trip
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Tell us your preferences and we'll craft a day-by-day Uttarakhand itinerary just for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Planner */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="bg-card border border-border rounded-3xl p-7 shadow-sm sticky top-24">
                  <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    Customize Your Trip
                  </h2>

                  {/* Days */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <Calendar size={15} className="text-primary" /> Number of Days
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[3, 5, 7, 10, 14].map(d => (
                        <button
                          key={d}
                          onClick={() => setDays(d)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            days === d ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/10'
                          }`}
                        >
                          {d}D
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <Wallet size={15} className="text-primary" /> Budget Range
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'budget', label: 'Budget', sub: '< ₹5K/day' },
                        { key: 'moderate', label: 'Moderate', sub: '₹5–10K' },
                        { key: 'luxury', label: 'Luxury', sub: '₹10K+' },
                      ].map(b => (
                        <button
                          key={b.key}
                          onClick={() => setBudget(b.key)}
                          className={`flex flex-col items-center py-3 rounded-xl border text-sm transition-colors ${
                            budget === b.key ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          <span className="font-semibold text-xs">{b.label}</span>
                          <span className="text-xs opacity-70 mt-0.5">{b.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <MapPin size={15} className="text-primary" /> Trip Focus
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {focuses.map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setFocus(key)}
                          className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-colors ${
                            focus === key ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          <Icon size={14} /> {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Group size */}
                  <div className="mb-7">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <Users size={15} className="text-primary" /> Group Size
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {groupSizes.map(g => (
                        <button
                          key={g}
                          onClick={() => setGroupSize(g)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            groupSize === g ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/10'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget estimate */}
                  <div className="bg-muted rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Estimated Cost</p>
                    <p className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{budgetEstimate.total}</p>
                    <p className="text-xs text-muted-foreground">{budgetEstimate.daily} per day · {days} days · {groupSize}</p>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-primary text-white font-semibold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <Sun size={16} />
                        </motion.div>
                        Building your itinerary...
                      </span>
                    ) : (
                      <><Calendar size={16} /> Generate Itinerary</>
                    )}
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Itinerary output */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!itinerary && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Mountain size={36} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Your itinerary will appear here
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Select your preferences on the left and click "Generate Itinerary" to get started.
                    </p>
                  </motion.div>
                )}

                {itinerary && (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                          Your {days}-Day Uttarakhand Journey
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          {focuses.find(f => f.key === focus)?.label} focus · {groupSize} · {budget.charAt(0).toUpperCase() + budget.slice(1)} budget
                        </p>
                      </div>
                      <span className="bg-secondary/20 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
                        {budgetEstimate.total} est.
                      </span>
                    </div>

                    <div className="space-y-4">
                      {itinerary.map((day, i) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                          className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {day.day}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                {day.title}
                              </h3>
                              <div className="flex flex-wrap gap-3 mt-1 mb-3">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin size={11} /> {day.stay}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock size={11} /> {day.meals}
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {day.activities.map((act, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                                    {act}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">Trip Summary</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            This {days}-day itinerary covers the best of Uttarakhand for a {groupSize.toLowerCase()} on a {budget} budget.
                            Estimated total cost: <strong>{budgetEstimate.total}</strong> including accommodation, meals, and local transport.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
