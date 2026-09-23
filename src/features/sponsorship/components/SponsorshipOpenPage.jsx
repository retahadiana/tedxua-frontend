import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ImageKit
const IK_BASE = 'https://ik.imagekit.io/vgyh8y8ut/sponsorship'
const IK = (path) => `${IK_BASE}/${path}`

const ASSETS = {
  tedxLogo:     IK('Group%201000004902.png'),
  borderBadge1: IK('Rectangle%2043.png'),
  borderBadge2: IK('Rectangle%2043%20(1).png'),
  borderBadge3: IK('Rectangle%2043%20(2).png'),
  vector137:    IK('Vector%20137.png'),
}

export default function SponsorshipOpenPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg,#111111 0%,#263A1F 18%,#ADA983 40%,#991A04 80%,#111111 100%)',
        }}
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative w-full pt-14">
        {/* section-section kamu di sini */}
      </main>

      <Footer />
    </div>
  )
}
