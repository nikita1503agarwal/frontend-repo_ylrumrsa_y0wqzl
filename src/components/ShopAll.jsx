import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ShopAll() {
  const [perfumes, setPerfumes] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/perfumes`).then(r => r.json()).then(setPerfumes).catch(() => setPerfumes([]))
  }, [])

  return (
    <div className="bg-black text-neutral-100 min-h-screen">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 h-16 border-b border-neutral-800/70 bg-black/70 backdrop-blur">
        <Link to="/" className="tracking-[0.3em] text-neutral-300">ELANOR</Link>
        <Link to="/collection" className="text-sm text-neutral-400 hover:text-neutral-200">Collection</Link>
      </div>

      <div className="relative">
        {perfumes.map((p, i) => (
          <section key={p.slug} className="h-screen relative flex items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="absolute inset-0" style={{ background: `radial-gradient(1200px 700px at 50% 60%, ${p.color}33, transparent)` }} />
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 w-full items-center">
              <div className={`order-${i % 2 === 0 ? '1' : '2'} flex justify-center`}>
                <div className="w-48 sm:w-60 h-72 sm:h-80 bg-neutral-900/80 rounded-md border border-neutral-700/60 shadow-2xl" />
              </div>
              <div className={`order-${i % 2 === 0 ? '2' : '1'}`}> 
                <p className="tracking-widest text-sm text-neutral-400">{p.sin}</p>
                <h2 className="text-4xl mt-2 mb-3">{p.name}</h2>
                <p className="text-neutral-300 mb-6">{p.short}</p>
                <div className="flex gap-6">
                  <Link to={`/sin/${p.slug}`} className="text-amber-300/80 hover:text-amber-200">View Full Story</Link>
                  <button className="px-4 py-2 rounded-full border border-amber-300/50 text-amber-200/90 hover:bg-[#3a0a12]">Add to Collection</button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
