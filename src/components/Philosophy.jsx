import { motion } from 'framer-motion'

export default function Philosophy() {
  const principles = [
    {
      title: 'Crafted Without Apology',
      copy: 'No safe notes. No crowd-pleasing compromises. Raw, complex, unapologetically bold.',
    },
    {
      title: 'Worn As Identity',
      copy: 'Not a signature—an embodiment. Each scent mirrors the facet of human nature you choose to honor.',
    },
    {
      title: 'Collected As Art',
      copy: 'Anatomical vessels. Mythological iconography. Bottles designed to display long after they\'re empty.',
    },
  ]

  return (
    <section className="relative bg-black text-neutral-200 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3]" style={{
        background: 'radial-gradient(700px 400px at 10% 50%, rgba(127,0,0,0.18), transparent), radial-gradient(700px 400px at 90% 50%, rgba(0,80,0,0.18), transparent)'
      }} />

      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="h-80 md:h-full w-full bg-gradient-to-b from-neutral-900/60 to-black rounded-xl border border-neutral-800/60 flex items-center justify-center">
            <div className="w-56 h-80 bg-neutral-900/80 rounded-md border border-neutral-700/60 shadow-2xl" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.06),transparent_40%)]" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl tracking-wide mb-6">The Temptation Philosophy</h2>
          <p className="text-neutral-300/90 leading-relaxed mb-10">
            Every civilization has whispered of them. Every soul has tasted them. We do not moralize—we bottle them. Each Elanor fragrance is a guilty pleasure crystallized, a sin made wearable.
          </p>

          <ul className="space-y-8">
            {principles.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-lg text-neutral-100 mb-1">{p.title}</p>
                <p className="text-neutral-400 leading-relaxed">{p.copy}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
