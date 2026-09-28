'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const categories = ['All dishes', 'Popular', 'Mains', 'Bowls', 'Sides', 'Drinks']

const dishes = [
  {
    id: 1,
    name: 'Miso Salmon Bowl',
    description: 'Roasted salmon, avocado, cucumber, pickled ginger, sesame rice.',
    price: 18,
    category: 'Bowls',
    badge: 'Best seller',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Crispy Chicken Bao',
    description: 'Two steamed buns, crispy chicken, hoisin, herbs, and chili crunch.',
    price: 14,
    category: 'Popular',
    badge: 'Guest favorite',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Truffle Mushroom Toast',
    description: 'Wild mushrooms, whipped ricotta, sourdough, and fresh thyme.',
    price: 13,
    category: 'Mains',
    badge: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Charred Corn Ribs',
    description: 'Lime crema, cotija, smoked paprika, and coriander.',
    price: 9,
    category: 'Sides',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Yuzu Sparkler',
    description: 'Yuzu, ginger, sparkling water, and a touch of honey.',
    price: 6,
    category: 'Drinks',
    badge: 'Refreshing',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Green Garden Salad',
    description: 'Little gem, snap peas, herbs, avocado, and green goddess dressing.',
    price: 12,
    category: 'Popular',
    badge: 'Fresh pick',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
  },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All dishes')
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 })
  const [searchOpen, setSearchOpen] = useState(false)

  const filteredDishes = useMemo(
    () => activeCategory === 'All dishes' ? dishes : dishes.filter((dish) => dish.category === activeCategory || (activeCategory === 'Popular' && dish.badge === 'Guest favorite')),
    [activeCategory],
  )
  const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const total = Object.entries(cart).reduce((sum, [id, count]) => sum + (dishes.find((dish) => dish.id === Number(id))?.price ?? 0) * count, 0)

  function updateCart(id: number, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + delta)
      const updated = { ...current }
      if (next === 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-10">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Table & Thyme home">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles size={17} strokeWidth={2.5} />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight">Table & Thyme</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="text-foreground" href="#menu">Menu</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#about" className="transition-colors hover:text-foreground">Our story</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="grid size-10 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Search menu">
              <Search size={19} />
            </button>
            <a href="#cart" className="relative flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              <ShoppingBag size={17} /> <span className="hidden sm:inline">Your order</span>
              <span className="grid size-5 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{itemCount}</span>
            </a>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border/70 px-5 py-3 lg:px-10"><div className="mx-auto flex max-w-7xl items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground"><Search size={17} /><input autoFocus placeholder="Search dishes, ingredients..." className="w-full bg-transparent outline-none placeholder:text-muted-foreground" /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button></div></div>}
      </header>

      <section id="top" className="mx-auto max-w-7xl px-5 pb-10 pt-10 lg:px-10 lg:pb-16 lg:pt-16">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground"><span className="size-1.5 rounded-full bg-accent-foreground" /> Open today · 11am–10pm</div>
            <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Good food,<br /><em className="font-normal text-primary">made easy.</em></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Thoughtful dishes made from bright, seasonal ingredients. Order ahead or get it delivered to your door.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Clock3 size={16} className="text-primary" /> 25–35 min</span><span className="text-border">|</span><span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Brooklyn & nearby</span></div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary/10 aspect-[1.3] lg:aspect-[1.25]">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=88" alt="Colorful salmon bowl with greens and sesame" className="size-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-background/90 px-4 py-3 backdrop-blur"><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">This week&apos;s pick</p><p className="mt-1 font-serif text-lg">Miso Salmon Bowl</p></div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 pb-28 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">The menu</p><h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Find your favorite.</h2></div><button className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex">View all <ArrowRight size={16} /></button></div>
        <div className="mb-9 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition ${activeCategory === category ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>{category}</button>)}</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => <article key={dish.id} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"><div className="relative aspect-[1.18] overflow-hidden"><img src={dish.image} alt={dish.name} className="size-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">{dish.badge}</span><button onClick={() => updateCart(dish.id, 1)} className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105" aria-label={`Add ${dish.name} to order`}><Plus size={20} /></button></div><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-2xl leading-tight">{dish.name}</h3><span className="shrink-0 text-sm font-semibold">${dish.price}</span></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{dish.description}</p>{cart[dish.id] && <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"><button onClick={() => updateCart(dish.id, -1)} className="grid size-7 place-items-center rounded-full border border-primary/30"><Minus size={13} /></button><span>{cart[dish.id]} in order</span><button onClick={() => updateCart(dish.id, 1)} className="grid size-7 place-items-center rounded-full border border-primary/30"><Plus size={13} /></button></div>}</div></article>)}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-secondary/50 px-5 py-14 lg:px-10"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Simple by design</p><h2 className="mt-3 font-serif text-4xl tracking-tight">Dinner, sorted.</h2></div>{[['01', 'Choose your favorites', 'Browse our seasonal menu and add what sounds good.'], ['02', 'Pick a time', 'We’ll have it ready when you are — no waiting around.'], ['03', 'Enjoy the good stuff', 'Unbox something delicious and make yourself at home.']].map(([number, title, text]) => <div key={number} className="border-t border-border pt-4"><span className="text-xs font-semibold text-primary">{number}</span><h3 className="mt-5 font-serif text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></section>

      <footer id="about" className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-9 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><p className="font-serif text-lg text-foreground">Table & Thyme</p><p>Made with care in Brooklyn · © 2026</p><div className="flex gap-5"><a href="#menu" className="hover:text-foreground">Menu</a><a href="#about" className="hover:text-foreground">Contact</a></div></footer>

      <div id="cart" className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-md rounded-2xl border border-primary/20 bg-primary p-3 text-primary-foreground shadow-2xl shadow-primary/20 sm:right-6 sm:left-auto sm:mx-0"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15"><ShoppingBag size={18} /></div><div className="min-w-0 flex-1"><p className="text-xs text-primary-foreground/70">Your order · {itemCount} {itemCount === 1 ? 'item' : 'items'}</p><p className="truncate text-sm font-semibold">Ready when you are</p></div><span className="font-semibold">${total}</span><button className="flex items-center gap-1 rounded-xl bg-primary-foreground px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary-foreground/90">Checkout <ChevronDown size={15} className="-rotate-90" /></button></div></div>
    </main>
  )
}
