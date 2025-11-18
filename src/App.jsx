import { Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Collection from './components/Collection'
import SinPage from './components/SinPage'
import ShopAll from './components/ShopAll'

function Home() {
  return (
    <div className="bg-black text-neutral-100">
      <Hero />
      <Philosophy />
      <Collection />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/shop" element={<ShopAll />} />
      <Route path="/sin/:slug" element={<SinPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-black text-neutral-300 flex items-center justify-center flex-col gap-6">
      <p>Lost in the dark.</p>
      <Link to="/" className="text-amber-300/80 hover:text-amber-200">Return to Vault</Link>
    </div>
  )
}
