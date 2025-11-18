import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

const SIN_PALETTES = {
  wrath: { tint: '#7a0a12' },
  envy: { tint: '#065f46' },
}

export default function SinPage() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/perfumes`).then(r => r.json()).then(list => {
      const found = (list || []).find(p => p.slug === slug)
      setItem(found || null)
    }).catch(() => setItem(null))
  }, [slug])

  const palette = SIN_PALETTES[slug] || { tint: '#3f3f46' }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-neutral-300 flex items-center justify-center">
        <p>Loading story...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 h-16 border-b border-neutral-800/70 bg-black/70 backdrop-blur">
        <Link to="/" className="tracking-[0.3em] text-neutral-300">ELANOR</Link>
        <Link to="/collection" className="text-sm text-neutral-400 hover:text-neutral-200">Back to Collection</Link>
      </div>

      {/* descent */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative h-56">
        <div className="absolute inset-0" style={{ background: `radial-gradient(1000px 400px at 50% 60%, ${palette.tint}33, transparent), radial-gradient(800px 300px at 50% 40%, rgba(0,0,0,0.9), #000)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 70%, ${palette.tint}26, transparent 60%)` }} />
      </motion.div>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 py-10">
        {/* left pinned bottle placeholder */}
        <div className="md:sticky md:top-20 h-[60vh] flex items-center justify-center">
          <div className="w-48 sm:w-60 h-72 sm:h-80 bg-neutral-900/80 rounded-md border border-neutral-700/60 shadow-2xl" />
        </div>

        {/* right story */}
        <div className="space-y-12">
          <StoryBlock title={`I. The Nature of ${item.sin}`} copy={item.story_nature} />
          <StoryBlock title="II. The Scent Interpretation" copy={item.story_interpretation} />
          <StoryBlock title={`III. Who Wears ${item.sin}`} copy={item.story_who} />
          <StoryBlock title="IV. The Ritual" copy={item.story_ritual} />

          {/* notes triad */}
          <div>
            <h4 className="text-neutral-200 tracking-wide mb-4">Fragrance Notes</h4>
            <div className="grid grid-cols-3 gap-6 text-sm text-neutral-300">
              <NotesColumn title="Top" items={item.notes_top} />
              <NotesColumn title="Heart" items={item.notes_heart} />
              <NotesColumn title="Base" items={item.notes_base} />
            </div>
          </div>

          {/* actions */}
          <div className="pt-2 flex items-center gap-4">
            <button className="px-5 py-3 rounded-full border border-amber-300/50 text-amber-200/90 hover:bg-[#3a0a12]">Claim {item.sin}</button>
            <p className="text-xs text-neutral-400">50ml. Extrait de Parfum. Hand-numbered edition.</p>
          </div>

          <div className="pt-6 text-sm text-neutral-400">
            Explore the other temptations → <Link to="/sin/envy" className="text-emerald-300/80 hover:text-emerald-200">Envy</Link> / <Link to="/sin/wrath" className="text-red-300/80 hover:text-red-200">Wrath</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function StoryBlock({ title, copy }) {
  return (
    <div>
      <h3 className="text-2xl tracking-wide mb-3">{title}</h3>
      <p className="text-neutral-300 leading-relaxed">{copy}</p>
    </div>
  )
}

function NotesColumn({ title, items }) {
  return (
    <div>
      <p className="uppercase tracking-widest text-xs text-neutral-500 mb-2">{title}</p>
      <ul className="space-y-1">
        {(items || []).map((n, i) => (
          <li key={i} className="text-neutral-300">{n}</li>
        ))}
      </ul>
    </div>
  )
}
