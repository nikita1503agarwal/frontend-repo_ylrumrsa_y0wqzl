import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SIN_COLORS = {
  Wrath: '#7a0a12',
  Envy: '#065f46',
  Lust: '#4c1d95',
  Gluttony: '#92400e',
  Sloth: '#d4d4d4',
  Pride: '#b45309',
  Greed: '#111827',
}

export default function Collection() {
  const [perfumes, setPerfumes] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/perfumes`).then(r => r.json()).then(setPerfumes).catch(() => setPerfumes([]))
  }, [])

  return (
    <section className="relative bg-black text-neutral-100">
      <div className="sticky top-0 h-24 z-10 flex items-center justify-between px-6 border-b border-neutral-800/70 bg-black/70 backdrop-blur">
        <Link to="/" className="tracking-[0.3em] text-neutral-300">ELANOR</Link>
        <Link to="/shop" className="text-sm text-amber-300/80 hover:text-amber-200">Shop All</Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl tracking-wide text-neutral-400 mb-10">The Collection Constellation</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.map((p, idx) => (
            <motion.div
              key={p.slug || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/70"
            >
              <div className="aspect-[4/3] flex items-center justify-center relative">
                <div className="w-40 h-56 bg-neutral-900/80 rounded-md border border-neutral-700/50 shadow-2xl" />
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(500px 300px at 50% 70%, ${SIN_COLORS[p.sin] || '#222'}30, transparent)`
                }} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="tracking-widest text-sm text-neutral-400">{p.sin}</p>
                  <p className="text-neutral-300">${p.price?.toFixed(0)}</p>
                </div>
                <h3 className="text-xl mb-1">{p.name}</h3>
                <p className="text-neutral-400 text-sm">{p.short}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link to={`/sin/${p.slug}`} className="text-amber-300/80 hover:text-amber-200">View Full Story</Link>
                  <button className="px-4 py-2 rounded-full border border-amber-300/50 text-amber-200/90 hover:bg-[#3a0a12]">Add to Collection</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
