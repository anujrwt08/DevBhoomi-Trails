import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, MapPin, Star, Trash2, ArrowRight, Mountain,
  Plus, Share2, Calendar, StickyNote, X, Check
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

type WishlistItem = {
  id: number;
  title: string;
  location: string;
  image: string;
  type: 'destination' | 'experience' | 'hidden-gem';
  rating: number;
  note: string;
  addedDate: string;
};

const defaultItems: WishlistItem[] = [
  {
    id: 1,
    title: 'Chopta Valley',
    location: 'Rudraprayag District',
    image: '/airo-assets/images/hidden-gems/chopta-valley',
    type: 'hidden-gem',
    rating: 4.9,
    note: 'Best in April for rhododendrons',
    addedDate: 'Mar 2026',
  },
  {
    id: 2,
    title: 'Valley of Flowers',
    location: 'Chamoli',
    image: '/airo-assets/images/destinations/valley-of-flowers',
    type: 'destination',
    rating: 4.8,
    note: 'Go in July for peak bloom',
    addedDate: 'Feb 2026',
  },
  {
    id: 3,
    title: 'Ganga Aarti at Triveni Ghat',
    location: 'Rishikesh',
    image: '/airo-assets/images/hidden-gems/rishikesh-ghats',
    type: 'experience',
    rating: 4.9,
    note: 'Arrive 30 mins early for front row',
    addedDate: 'Jan 2026',
  },
  {
    id: 4,
    title: 'Munsiyari Village',
    location: 'Pithoragarh District',
    image: '/airo-assets/images/hidden-gems/munsiyari',
    type: 'hidden-gem',
    rating: 4.8,
    note: '',
    addedDate: 'Mar 2026',
  },
  {
    id: 5,
    title: 'White Water Rafting',
    location: 'Rishikesh',
    image: '/airo-assets/images/experiences/river-rafting',
    type: 'experience',
    rating: 4.8,
    note: 'Book in advance for weekends',
    addedDate: 'Feb 2026',
  },
  {
    id: 6,
    title: 'Auli Ski Resort',
    location: 'Chamoli',
    image: '/airo-assets/images/destinations/auli-skiing',
    type: 'destination',
    rating: 4.8,
    note: 'Jan–Feb for best snow',
    addedDate: 'Jan 2026',
  },
];

const typeColors: Record<string, string> = {
  destination: 'bg-primary text-white',
  experience: 'bg-accent text-white',
  'hidden-gem': 'bg-secondary text-primary',
};

const typeLabels: Record<string, string> = {
  destination: 'Destination',
  experience: 'Experience',
  'hidden-gem': 'Hidden Gem',
};

function NoteModal({ item, onSave, onClose }: { item: WishlistItem; onSave: (note: string) => void; onClose: () => void }) {
  const [note, setNote] = useState(item.note);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            Add a Note
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{item.title}</p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="E.g. Best time to visit, things to pack, local tips..."
          className="w-full bg-muted border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none h-28"
        />
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Cancel
          </button>
          <button
            onClick={() => { onSave(note); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
          >
            <Check size={14} /> Save Note
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WishCard({
  item,
  onRemove,
  onNoteEdit,
}: {
  item: WishlistItem;
  onRemove: (id: number) => void;
  onNoteEdit: (item: WishlistItem) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-card rounded-2xl overflow-hidden border border-border group"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[item.type]}`}>
          {typeLabels[item.type]}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/80 transition-colors group/del"
        >
          <Heart size={14} className="fill-red-400 text-red-400 group-hover/del:hidden" />
          <Trash2 size={14} className="text-white hidden group-hover/del:block" />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="text-white/60 text-xs">{item.addedDate}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {item.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <p className="text-muted-foreground text-sm flex items-center gap-1"><MapPin size={12} />{item.location}</p>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-secondary text-secondary" />
            <span className="text-sm font-semibold">{item.rating}</span>
          </div>
        </div>

        {/* Note */}
        <button
          onClick={() => onNoteEdit(item)}
          className={`w-full text-left text-xs rounded-xl px-3 py-2 mb-3 transition-colors border ${
            item.note
              ? 'bg-secondary/10 border-secondary/20 text-foreground/80'
              : 'bg-muted border-border text-muted-foreground hover:border-primary/30'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <StickyNote size={11} />
            {item.note || 'Add a personal note...'}
          </span>
        </button>

        <Link
          to="/plan-trip"
          className="flex items-center justify-center gap-1.5 w-full bg-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Calendar size={12} /> Plan This Visit
        </Link>
      </div>
    </motion.div>
  );
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(defaultItems);
  const [noteItem, setNoteItem] = useState<WishlistItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'destination' | 'experience' | 'hidden-gem'>('all');
  const [copied, setCopied] = useState(false);

  const filtered = items.filter(i => filter === 'all' || i.type === filter);

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  const saveNote = (id: number, note: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, note } : i));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <title>My Wishlist — DevBhoomi Trails</title>
      <meta name="description" content="Your saved Uttarakhand destinations, experiences, and hidden gems — all in one place." />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-accent text-sm font-semibold uppercase tracking-widest">Saved Places</span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  My Wishlist
                </h1>
                <p className="text-muted-foreground mt-2">
                  {items.length} places saved · Your personal Uttarakhand bucket list
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
                >
                  {copied ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Share2 size={14} /> Share List</>}
                </button>
                <Link
                  to="/plan-trip"
                  className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Calendar size={14} /> Plan from Wishlist
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Filter tabs */}
          <FadeIn delay={0.1}>
            <div className="flex gap-2 mt-8 overflow-x-auto pb-1">
              {[
                { key: 'all', label: `All (${items.length})` },
                { key: 'destination', label: `Destinations (${items.filter(i => i.type === 'destination').length})` },
                { key: 'experience', label: `Experiences (${items.filter(i => i.type === 'experience').length})` },
                { key: 'hidden-gem', label: `Hidden Gems (${items.filter(i => i.type === 'hidden-gem').length})` },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key as typeof filter)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === f.key
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <AnimatePresence>
                  {filtered.map(item => (
                    <WishCard
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onNoteEdit={setNoteItem}
                    />
                  ))}
                </AnimatePresence>

                {/* Add more card */}
                <motion.div
                  layout
                  className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px] hover:border-primary/40 transition-colors group cursor-pointer"
                >
                  <Link to="/explore" className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Plus size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      Discover more places
                    </p>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Mountain size={36} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  No saved places yet
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                  Start exploring and tap the heart icon on any destination or experience to save it here.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all text-sm"
                >
                  <ArrowRight size={15} /> Start Exploring
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trip planning CTA */}
      {items.length > 0 && (
        <section className="py-14 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to turn your wishlist into a trip?
              </h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                You have {items.length} amazing places saved. Let us build the perfect itinerary around them.
              </p>
              <Link
                to="/plan-trip"
                className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-secondary/90 transition-all text-sm"
              >
                <Calendar size={16} /> Plan My Wishlist Trip <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Note modal */}
      <AnimatePresence>
        {noteItem && (
          <NoteModal
            item={noteItem}
            onSave={note => saveNote(noteItem.id, note)}
            onClose={() => setNoteItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
