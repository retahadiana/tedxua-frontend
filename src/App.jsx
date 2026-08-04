import React from 'react'
import { Navbar, Footer } from './components/layout'
import AboutUsDetail from './features/static/components/AboutUsDetail'

function App() {
  return (
    <div className="w-full min-h-screen bg-[#1E0F0A] text-white">
      <Navbar />
      <AboutUsDetail />
      <Footer />
    </div>
  )
}

export default App
