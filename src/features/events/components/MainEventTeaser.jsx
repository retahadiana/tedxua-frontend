import React from 'react'
import { motion } from 'framer-motion'
import { Navbar, Footer } from '@/components/layout'
import { EventComposition } from './EventComposition'

import teaserFrame from '@/assets/images/main-event/main-teaser.webp'
import teaserGround from '@/assets/images/main-event/bottom-teaser.webp'

// Embed URL of the teaser video (e.g. https://www.youtube-nocookie.com/embed/<id>); empty shows a placeholder
const TEASER_EMBED_URL = ''

// main-teaser.webp is the 1340x756 frame artwork (exported at 2x); hotspots below are % of that canvas
const FRAME_W = 1340
const FRAME_H = 756
const pct = (v, total) => `${(v / total) * 100}%`
// Video sits just inside the rounded frame (rect 204,133 → 1158,701 with a ~4px stroke)
const VIDEO_BOX = {
  left: pct(212, FRAME_W),
  top: pct(141, FRAME_H),
  width: pct(939, FRAME_W),
  height: pct(552, FRAME_H),
}

// Desktop top padding (pt-24) that clears the fixed navbar; EventComposition keeps it clear when scaled down
const TOP_PADDING = 96
// bottom-teaser.webp is 1440x533 and spans the section width; its soil band (bottom ~93px) is ~6.5% of that width.
// Padding-bottom % resolves against width, so the frame always ends 48px above the soil.
const GROUND_CLEARANCE = 'calc(6.5% + 48px)'

export function MainEventTeaser() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#8C6A57] font-gordita text-[#FEF8E0] overflow-clip">
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Sky and ground sit outside the zoomed canvas; both are width-based, so they follow the scaled frame */}
      <div className="relative overflow-hidden">
        {/* Atmosphere: brown sky fading into olive, with glows behind the side characters */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8C6A57] via-[#8E7F68] to-[#7E866B]" />
          <div className="absolute top-[40%] -left-32 w-[480px] h-[480px] bg-[#F6EBE7]/25 rounded-full blur-[120px]" />
          <div className="absolute top-[24%] -right-16 w-[480px] h-[480px] bg-[#FFFB99]/20 rounded-full blur-[120px]" />
        </div>

        {/* Ground with the vine-wrapped figure (left) and root hand (right) */}
        <img
          src={teaserGround}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none"
        />

        <EventComposition topPadding={TOP_PADDING}>
          <section className="relative w-full pt-24" style={{ paddingBottom: GROUND_CLEARANCE }}>
            {/* Frame composition: logo, "Our Teaser", video frame and "What's On Main Event?" label come from one image */}
            <div className="relative z-10 w-full max-w-[1280px] mx-auto px-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[1340/756]"
              >
                <h1 className="sr-only">TEDxUniversitasAirlangga — Our Teaser</h1>
                <img
                  src={teaserFrame}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 w-full h-full pointer-events-none select-none"
                />

                <div className="absolute overflow-hidden rounded-[12px]" style={VIDEO_BOX}>
                  {TEASER_EMBED_URL ? (
                    <iframe
                      src={TEASER_EMBED_URL}
                      title="TEDxUniversitasAirlangga 2026 Teaser"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex w-full h-full items-center justify-center">
                      <p className="font-essays font-bold text-2xl text-[#FEF8E0]/80 tracking-[0.15em] uppercase">
                        Teaser coming soon
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        </EventComposition>
      </div>

      {/* Solid footer, matching the main event page; grows on tall screens so nothing shows below it */}
      <div className="relative z-30 flex-grow bg-black">
        <Footer className="!bg-none !bg-black" />
      </div>
    </div>
  )
}

export default MainEventTeaser
