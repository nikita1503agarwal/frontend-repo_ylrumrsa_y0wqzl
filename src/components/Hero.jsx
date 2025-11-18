import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const GOLD = 'var(--gold)'

export default function Hero() {
  // Phases: 0 velvet black, 1 ring tighten + phrase, 2 skull draw, 3 invitation
  const [phase, setPhase] = useState(0)

  // Begin on mount: schedule phase progressions
  useEffect(() => {
    const timers = []
    // Start subtle one-shot tone
    fireOneNote()
    // Progression timings (ms)
    timers.push(setTimeout(() => setPhase(1), 600)) // ring appears
    timers.push(setTimeout(() => setPhase(2), 3000)) // skull forms
    timers.push(setTimeout(() => setPhase(3), 5600)) // invitation appears
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-black text-neutral-100 overflow-hidden select-none">
      {/* Velvet blackout: pure, infinite darkness */}
      <div className="absolute inset-0 bg-black" />

      {/* Gold dust ebbing subtly around center (very restrained) */}
      <GoldDust active={phase >= 1} />

      {/* Faint rising mist from below */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-0 right-0 h-80"
        style={{
          background: 'radial-gradient(50% 60% at 50% 100%, rgba(255,255,255,0.06), transparent 70%)'
        }}
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Centerpiece */}
      <div className="relative z-0 h-screen w-full flex items-center justify-center">
        <div className="relative w-[540px] max-w-[92vw] aspect-square">
          {/* Hand-drawn ring (uneven) */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.svg
                key="ring"
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full z-[1]"
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.33, 0, 0.2, 1] }}
              >
                <UnevenRing />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Sentence ignition as smoke/embers */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                key="phrase"
                className="absolute inset-0 grid place-items-center px-6 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div
                  className="w-full mx-auto text-center overflow-hidden px-6"
                  style={{ maxWidth: 'min(60vw, 900px)' }}
                >
                  <FlickerLine text="Sin is the truest luxury." />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skull manifestation (stroke drawing) */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="skull"
                className="absolute inset-0 grid place-items-center z-[2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SkullRevelation />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cardinal glyphs + Invitation */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="invitation"
                className="absolute inset-0 flex items-end justify-center pb-10 z-[3]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full flex flex-col items-center gap-6">
                  <Glyphs />
                  <div className="text-center">
                    <p className="font-cinzel italic text-[18px] sm:text-[20px] text-neutral-300/90 tracking-wide">
                      The senses are gates. Choose which you open.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <GhostButton to="/collection" label="SEE THE FRAGRANCES" />
                    <GhostButton to="/oath" label="READ THE OATH" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function UnevenRing() {
  // A slightly imperfect ring using multiple offset strokes
  return (
    <g fill="none" stroke={GOLD} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      {/* base circle */}
      <circle cx="50" cy="50" r="38" opacity="0.9" />
      {/* subtle wobble overlays */}
      <path d="M12,52c0-21,17-38,38-38s38,17,38,38" opacity="0.55" />
      <path d="M8,50c0-23.5,19-42.5,42.5-42.5S93,26.5,93,50" opacity="0.35" />
    </g>
  )
}

function FlickerLine({ text }) {
  // Tokenize into words and spaces, so spaces are preserved as raw text (not animated spans)
  const tokens = useMemo(() => text.match(/\S+|\s+/g) || [text], [text])

  // randomized reveal order by letter index across all letters (spaces excluded)
  const letterOrder = useMemo(() => {
    const idx = []
    let count = 0
    tokens.forEach(tok => {
      if (!/^\s+$/.test(tok)) {
        for (let i = 0; i < tok.length; i++) idx.push(count++)
      }
    })
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    return idx
  }, [tokens])

  // Index lookup helper
  let globalLetterIndex = 0

  // Mobile-only manual break before the word "luxury."
  const breakWord = 'luxury.'

  return (
    <div className="text-center leading-tight">
      <motion.div
        className="font-cinzel sm:whitespace-nowrap whitespace-pre-line inline-block"
        aria-label={text}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.0 } } }}
        style={{
          fontSize: 'clamp(22px, 4vw, 64px)',
          letterSpacing: '0.08em',
          wordSpacing: '0.25em',
          maxWidth: '100%',
          textAlign: 'center'
        }}
      >
        {tokens.map((tok, tIdx) => {
          const isSpace = /^\s+$/.test(tok)
          if (isSpace) {
            // return raw space so word-spacing can apply
            return tok
          }

          const insertBreak = tok === breakWord

          return (
            <span key={`w-${tIdx}`} className="inline">
              {insertBreak && <br className="sm:hidden" />}
              {/* animate each letter inside the word */}
              {Array.from(tok).map((ch, i) => {
                const myIndex = globalLetterIndex++
                const delayIndex = letterOrder.indexOf(myIndex)
                return (
                  <motion.span
                    key={`l-${tIdx}-${i}`}
                    variants={{
                      hidden: { opacity: 0, filter: 'blur(6px)', y: 6 },
                      visible: {
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                        transition: {
                          delay: 0.1 + delayIndex * 0.02,
                          duration: 0.28,
                          ease: 'easeOut'
                        }
                      }
                    }}
                    style={{ color: '#e8e6e3' }}
                  >
                    {ch}
                  </motion.span>
                )
              })}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}

function SkullRevelation() {
  // Drawn with vertical strokes; each path glows briefly then settles
  return (
    <svg viewBox="0 0 128 160" className="w-[220px] sm:w-[260px] md:w-[300px]" fill="none">
      <g stroke={GOLD} strokeWidth="1.2" strokeLinecap="round">
        <Stroke d="M64 20c-20 0-34 14-34 33 0 11 5 19 12 24" delay={0.0} />
        <Stroke d="M64 20c20 0 34 14 34 33 0 11-5 19-12 24" delay={0.1} />
        {/* Forehead */}
        <Stroke d="M38 58c8-6 18-9 26-9s18 3 26 9" delay={0.2} />
        {/* Eyes */}
        <Stroke d="M46 78c0-5 4-9 9-9s9 4 9 9" delay={0.35} />
        <Stroke d="M64 78c0-5 4-9 9-9s9 4 9 9" delay={0.42} />
        {/* Jaw and teeth indication */}
        <Stroke d="M42 98c6 6 14 8 22 8s16-2 22-8" delay={0.52} />
        <Stroke d="M52 110h24" delay={0.62} />
        <Stroke d="M58 116h12" delay={0.7} />
      </g>
    </svg>
  )
}

function Stroke({ d, delay = 0 }) {
  const pathRef = useRef(null)
  const [len, setLen] = useState(0)
  useEffect(() => {
    if (pathRef.current) {
      setLen(pathRef.current.getTotalLength())
    }
  }, [])
  return (
    <motion.path
      ref={pathRef}
      d={d}
      initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 0.9 }}
      animate={{
        strokeDashoffset: 0,
        opacity: [1, 0.6, 0.9],
        stroke: [GOLD, '#8d7747', GOLD]
      }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    />
  )
}

function Glyphs() {
  return (
    <div className="relative w-full max-w-[540px]">
      {/* positions along the rim using absolute offsets */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-center">
        <p className="text-[11px] tracking-[0.3em] text-neutral-400">NORTH — Ἁμαρτία</p>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-right">
        <p className="text-[11px] tracking-[0.3em] text-neutral-400">EAST — Ἀλαζονεία</p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-center">
        <p className="text-[11px] tracking-[0.3em] text-neutral-400">SOUTH — Φθόνος</p>
      </div>
    </div>
  )
}

function GhostButton({ to, label }) {
  return (
    <Link
      to={to}
      className="relative inline-flex items-center justify-center px-7 py-3 text-[12px] tracking-[0.28em] uppercase border gold-border text-neutral-200"
      style={{ borderColor: 'var(--gold)' }}
    >
      <span className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0" style={{ boxShadow: '0 0 24px rgba(201,166,97,0.35)'}} />
      <span className="relative z-10" style={{ color: '#e8e6e3' }}>{label}</span>
      <span className="absolute left-0 right-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,166,97,0.9), transparent)'}} />
      <style>{`
        a:hover > span:first-child { opacity: 1; }
      `}</style>
    </Link>
  )
}

function GoldDust({ active }) {
  // Minimal specks orbiting center radius, rendered on canvas
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let t = 0
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    function resize() {
      canvas.width = canvas.offsetWidth * DPR
      canvas.height = canvas.offsetHeight * DPR
    }
    resize()
    const obs = new ResizeObserver(resize)
    obs.observe(canvas)

    const particles = Array.from({ length: 46 }).map((_, i) => ({
      baseR: 0.32 + Math.random() * 0.04, // as portion of minDim
      ang: Math.random() * Math.PI * 2,
      spd: (Math.random() * 0.0006 + 0.0002) * (Math.random() < 0.5 ? -1 : 1),
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.35 + 0.15
    }))

    function draw() {
      const w = canvas.width, h = canvas.height
      const minDim = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      particles.forEach(p => {
        p.ang += p.spd
        const r = p.baseR * minDim
        const x = Math.cos(p.ang) * r
        const y = Math.sin(p.ang) * r
        const a = p.alpha * (0.7 + 0.3 * Math.sin(t + p.ang * 2))
        ctx.fillStyle = `rgba(201,166,97,${a})`
        ctx.beginPath()
        ctx.arc(x, y, p.size * DPR, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
      t += 0.01
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [active])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function fireOneNote() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 58 // low, reverent tone
    gain.gain.value = 0.0001 // start near silent to avoid pops
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.start(now)
    // quick fade-in then decay to silence
    gain.gain.setTargetAtTime(0.08, now, 0.2)
    gain.gain.setTargetAtTime(0.0001, now + 1.2, 0.6)
    osc.stop(now + 3)
  } catch (e) {
    // ignore autoplay restrictions silently
  }
}
