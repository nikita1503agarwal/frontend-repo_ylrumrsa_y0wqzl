import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      {/* Blackout intro */}
      <AnimatePresence>
        {!show && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>

      {/* Breathing gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 800px at 50% 60%, rgba(128,0,32,0.25), transparent), radial-gradient(800px 600px at 50% 40%, rgba(10,10,10,0.9), #000000)'
        }}
      />

      {/* Pulsing embers */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 70%, rgba(86,11,20,0.35), transparent 60%)'
        }}
      />

      {/* Skull monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6"
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8"
        >
          <SkullMonogram className="w-32 h-32 text-neutral-200/90" />
        </motion.div>

        {/* Brand name reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } }
          }}
          className="text-5xl sm:text-6xl tracking-[0.2em] text-neutral-100 font-light"
          aria-label="ELANOR"
        >
          {Array.from('ELANOR').map((ch, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        {/* Philosophy line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-5 text-neutral-300/90 max-w-xl"
        >
          Seven scents. Seven temptations. Unapologetically yours.
        </motion.p>

        {/* Enter collection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10"
        >
          <Link
            to="/collection"
            className="group inline-flex items-center gap-3 border border-amber-300/40 text-amber-200/90 px-8 py-3 rounded-full transition-colors hover:bg-[#3a0a12] hover:text-amber-100"
          >
            Enter the Collection
            <span className="relative inline-flex w-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300" />
            </span>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-200/70 text-sm tracking-widest"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SkullMonogram({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 44v4c0 2 1.5 3 3.5 3H24v4h6v-4h4v4h6v-4h.5c2 0 3.5-1 3.5-3v-4"/>
        <path d="M32 8c-11 0-18 7.5-18 18 0 6 2.5 10 6 12 1.5 1 2 2 2 3v3h20v-3c0-1 .5-2 2-3 3.5-2 6-6 6-12 0-10.5-7-18-18-18Z"/>
        <circle cx="24" cy="29" r="3"/>
        <circle cx="40" cy="29" r="3"/>
        <path d="M28 36c1.5 1 3 1 4 1s2.5 0 4-1"/>
      </g>
    </svg>
  )
}
