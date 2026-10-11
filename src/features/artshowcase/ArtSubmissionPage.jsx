import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout'
import { motion } from 'framer-motion'
import iconTitle from '@/assets/art show/icon title.png'
import elipsSubmission from '@/assets/art show/elips submission.png'
import fontTitle from '@/assets/art show/font title.png'
import buttonSubmission from '@/assets/art show/button submission.png'
import buttonGuidebook from '@/assets/art show/button guidebook.png'
import bgBawah from '@/assets/art show/bg bawah.png'
import rumputCoklat from '@/assets/art show/rumput coklat.png'
import light from '@/assets/art show/light.png'
import whatIsArtExhibition from '@/assets/art show/WHAT IS ART EXHIBITION_.png'
import theme from '@/assets/art show/Theme.png'
import termsCondition from '@/assets/art show/Terms n condition.png'
import submissionRequirement from '@/assets/art show/Submission requirement.png'
import lastBenefit from '@/assets/art show/last Benefit.png'
import st1 from '@/assets/art show/st1.png'
import st2 from '@/assets/art show/st2.png'
import st3 from '@/assets/art show/st3.png'
import iconInstagram from '@/assets/icons/Social Icons.svg'
import iconLinkedin from '@/assets/icons/Social Icons (1).svg'
import iconTiktok from '@/assets/icons/Social Icons (2).svg'
import iconX from '@/assets/icons/Social Icons (3).svg'
import iconEmail from '@/assets/icons/Vector.svg'
import logoTedxUA from '@/assets/icons/tedx unair putih (1) 2.svg'
import { cn } from '@/utils/cn'
import { ZoomNormalizer } from '@/hooks/useZoomNormalization'

const SOCIALS = [
    { src: iconInstagram, href: '#', label: 'Instagram' },
    { src: iconLinkedin, href: '#', label: 'LinkedIn' },
    { src: iconTiktok, href: '#', label: 'TikTok' },
    { src: iconX, href: '#', label: 'X' },
    { src: iconEmail, href: '#', label: 'Email' },
]

export function ArtSubmissionPage() {
    const [shouldFlicker, setShouldFlicker] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShouldFlicker(true), 7000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <ZoomNormalizer>
          <div className="w-full bg-[#0E1A06] text-white overflow-x-hidden">
            <Navbar />
            
            {/* SECTION 1: Hero with elips background */}
            <section className="relative w-full min-h-screen pt-20">
                {/* Elips background - z-15, between content and font title */}
                <img
                    src={elipsSubmission}
                    alt=""
                    className="absolute top-[300px] left-1/2 -translate-x-1/2 z-15 pointer-events-none w-[120vw] max-w-[800px] h-auto sm:z-0 sm:w-[1000px] sm:max-w-none sm:h-[700px] sm:max-h-[700px] sm:top-[110px] sm:left-1/2 sm:-translate-x-[calc(50%-300px)] sm:rotate-[-10deg]"
                    aria-hidden="true"
                />
                
                {/* Main content container - z-10 */}
                <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
                    {/* Icon Title - mobile centered, desktop left */}
                    <motion.img
                        src={iconTitle}
                        alt="Art Showcase"
                        className="w-auto max-w-[80vw] sm:max-w-[850px] h-auto object-contain mx-auto sm:mx-0 sm:absolute sm:left-0 sm:top-0 sm:-translate-y-[170px] sm:-ml-[120px] z-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                    
                    {/* Font Title + Buttons - mobile centered, desktop right */}
                    <div className="flex flex-col items-center gap-4 w-full sm:items-start sm:absolute sm:right-0 sm:top-0 sm:translate-x-[580px] sm:-translate-y-[550px] sm:w-[600px] mt-8 sm:mt-0">
                        {/* Font Title */}
                        <motion.img
                            src={fontTitle}
                            alt="Art Exhibition Title"
                            className="w-auto max-w-[80vw] sm:max-w-[650px] h-auto object-contain pointer-events-none mx-auto sm:mx-0"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        
                        {/* Buttons below font title */}
                        <div className="flex flex-row gap-[40px] relative z-60 mt-6 sm:mt-[30px] sm:ml-[200px] w-full justify-center sm:justify-start">
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSeBp2GRDbZgENWG2LXJGYcWW5etPctzbJANeSVd0kO34gpxzg/viewform?usp=publish-editor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <motion.img
                                        src={buttonSubmission}
                                        alt="Submission Link"
                                        className="h-14 sm:h-16 w-auto object-contain cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(235,0,40,0.6)] active:scale-95"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                                    />
                                </a>
                                <a
                                    href="https://drive.google.com/drive/folders/1zs-eezkSnSo6x7qJHHtm64O33nDg8yMj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <motion.img
                                        src={buttonGuidebook}
                                        alt="Guidebook"
                                        className="h-14 sm:h-16 w-auto object-contain cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(235,0,40,0.6)] active:scale-95"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                                    />
                                </a>
                            </div>
                    </div>
                    
                    {/* Rumput Coklat below icon title (left side), covering part of icon title - wider */}
                    <motion.img
                        src={rumputCoklat}
                        alt=""
                        className="w-[110vw] max-w-[1600px] left-[-5vw] h-auto object-cover pointer-events-none absolute z-50 top-[500px] translate-x-[60px] sm:relative sm:top-auto sm:left-auto sm:translate-x-0 sm:-mt-[124px] sm:-mt-[132px] sm:mt-0 sm:mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    />
                </div>
            </section>

            {/* SECTION 2: bg bawah as background with all content overlaying on top */}
            <section className="relative w-full">
                {/* bg bawah - z-0 (background) - fixed position */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none -top-[370px]"
                    style={{
                        backgroundImage: `url(${bgBawah})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />
                
                {/* Content container - z-10 (overlaying on top of bg bawah) */}
                <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-20 sm:py-32">
                    {/* Light + What is Art Exhibition */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Light - z-10 */}
                        <motion.img
                            key="light"
                            src={light}
                            alt="Light"
                            className="w-[115vw] max-w-none h-auto object-contain absolute top-[20vw] left-1/2 -translate-x-1/2 z-10 translate-y-[-400px] translate-x-[-750px]"
                            initial={{ opacity: 1 }}
                            animate={shouldFlicker
                                ? {
                                    opacity: [
                                        1, 0.1, 1, 0.05, 1, 0.15, 1, 0.08, 1, 0.12, 1,
                                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                                    ]
                                }
                                : { opacity: 1 }}
                            transition={shouldFlicker
                                ? { duration: 8, ease: "linear", repeat: Infinity, repeatDelay: 0 }
                                : { duration: 0.5 }}
                        />
                        
{/* What is Art Exhibition - z-20 */}
                        <motion.img
                            src={whatIsArtExhibition}
                            alt="What is Art Exhibition"
                            className="w-auto max-w-[90%] h-auto object-contain relative z-20 sm:max-w-full mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, x: -50, y: -300 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                        <motion.p
                            className="mt-8 text-[#FFF4EA] leading-[1.4] text-justify font-essays max-w-[650px] mx-auto px-4 sm:ml-0 relative z-20"
                            style={{ fontSize: 'clamp(16px, 1.5vw, 24px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, x: 400, y: -200 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            The Art Showcase at TEDxUniversitasAirlangga 2026 is more than just a space to display artworks. It is a place to look beyond what is visible and notice the stories, connections, and processes that quietly shape who we become.
                            <br /><br />
                            Guided by our theme Beneath What We See: The Mycelium, this exhibition draws inspiration from mycelium, a network that grows beneath the surface, connecting and supporting what we see above it. Much like mycelium, our lives are shaped by things that are not always visible: the people we meet, the experiences we carry, and the connections that continue to grow over time.
                            <br /><br />
                            Through this exhibition, artworks can explore the many things that exist beneath the surface of our everyday lives. We invite artists to bring their own interpretation of what lies beneath the surface. Share the stories, connections, and moments that have shaped you, and let your artwork become a part of this growing network.
                        </motion.p>
                    </motion.div>
                    
                    {/* Theme - z-20 */}
                    <motion.div
                        className="text-center mt-16 sm:mt-24"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.img
                            src={theme}
                            alt="Theme"
                            className="w-auto max-w-[90%] h-auto object-contain mx-auto relative z-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </motion.div>
                    
                    {/* ST Cards - z-20 */}
                    <motion.div
                        className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.img src={st1} alt="ST1" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20 sm:flex-1"
                            initial={{ opacity: 0, y: 30, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        />
                        <motion.img src={st2} alt="ST2" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20 sm:flex-1"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                        <motion.img src={st3} alt="ST3" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20 sm:flex-1"
                            initial={{ opacity: 0, y: 30, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                    </motion.div>
                    
                    {/* Terms & Conditions - z-10 */}
                    <motion.div
                        className="mt-[114px] sm:mt-[146px] text-left max-w-[900px] mx-auto w-full px-4 relative z-10"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.img
                            src={termsCondition}
                            alt="Terms N Condition"
                            className="w-auto max-w-full h-auto object-contain mb-8 mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.ol className="font-essays text-[#FFF4EA] leading-[1.4] space-y-4 list-decimal list-inside w-full" style={{ fontSize: 'clamp(16px, 1.8vw, 28px)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        >
                            <li>Artwork submission is open for public.</li>
                            <li>There are no restrictions on the form and media of the art submission.</li>
                            <li>The artist is responsible for the originality of the submitted work. If the artist uses material from other sources (plagiarism, copycat, etc.), a statement from the original owner must be made, and TEDxUniversitasAirlangga is not responsible for any commotion made.</li>
                            <li>By submitting your artwork to TEDxUniversitasAirlangga 2026, you have given us license to use, promote, and display your Artwork for commercial and non-commercial purposes throughout upcoming events.</li>
                            <li>Artworks that have previously been included in other exhibitions are allowed to be submitted.</li>
                            <li>Artists must include a statement of registration for the Art Exhibition Submission TEDxUniversitasAirlangga 2026 by downloading the template below: <motion.a href="#" className="underline font-swung" style={{ color: '#FFF4EA' }} whileHover={{ color: '#FF8F6B' }} transition={{ duration: 0.2 }}>STATEMENT AND AGREEMENT OF ART EXHIBITION REGISTRATION</motion.a></li>
                        </motion.ol>
                        
                        <motion.img
                            src={lastBenefit}
                            alt="Benefit"
                            className="w-auto max-w-[90vw] sm:max-w-full h-auto object-contain mt-[78px] mb-8 mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                        
                        <motion.ol className="font-essays text-[#FFF4EA] leading-[1.4] space-y-4 list-decimal list-inside w-full" style={{ fontSize: 'clamp(16px, 1.8vw, 28px)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        >
                            <li>Main Event TEDxUniversitasAirlangga 2026 1 free pass ticket</li>
                            <li>Certificate.</li>
                        </motion.ol>
                        
                        <motion.img
                            src={submissionRequirement}
                            alt="Submission Requirement"
                            className="w-auto max-w-full h-auto object-contain mt-[78px] mb-8 mx-auto"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        />
                        
                        <motion.ol className="font-essays text-[#FFF4EA] leading-[1.4] space-y-4 list-decimal list-inside w-full" style={{ fontSize: 'clamp(16px, 1.8vw, 28px)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        >
                            <li>Self portrait.</li>
                            <li>Brief biography of the artists (maximum 100 words). (.pdf)</li>
                            <li>Permission letter of art copyright. (.pdf) (optional)</li>
                            <li>Description of the submitted artworks.</li>
                            <li>Photo or/and video of submitted artworks.</li>
                            <li>Artist's statement including meaning and issues that are brought up through the artwork.</li>
                        </motion.ol>
                    </motion.div>
                    
                    {/* Footer - z-20 */}
                    <footer className="mt-20 sm:mt-28 max-w-full mx-auto relative z-20">
                        <div className="flex flex-col-reverse gap-8 sm:gap-12 md:flex-row md:items-start md:justify-between">
                            <div className="max-w-none flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
                                <img src={logoTedxUA} alt="TEDx Universitas Airlangga" className="h-7 sm:h-8 md:h-10 w-auto mb-2 md:mb-0" />
                                <p className="mt-4 max-w-[90vw] sm:max-w-[244px] md:max-w-none font-gordita text-[14px] sm:text-[9px] md:text-[16px] text-white font-normal break-words px-4 sm:px-0">
                                    TEDxUniversitasAirlangga is organized by an independent community within the scope of 
                                    BEM FEB Universitas Airlangga to spread new ideas and spark conversation at the 
                                    university level.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-4 md:items-end w-full md:w-auto">
                                <span className="font-essays text-[16px] sm:text-[10px] md:text-[18px] font-medium uppercase text-[#FD2A05] break-words">
                                    Connect With Us
                                </span>
                                <div className="flex gap-3 md:gap-3.5">
                                    {SOCIALS.map(({ src, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            className="opacity-100 md:opacity-80 transition-all hover:opacity-100 hover:scale-110"
                                        >
                                            <img src={src} alt={label} className="w-7 h-7 sm:w-6 sm:h-6 md:w-[18px] md:h-[18px] object-contain" />
                                        </a>
                                    ))}
                                </div>
                                <span className="font-swungnote text-[14px] sm:text-[15px] md:text-[15px] font-normal uppercase text-white break-words mt-2 md:mt-0">
                                    Beneath What We See: The Mycelium
                                </span>
                            </div>
                        </div>
                        <div className="mx-auto mt-10 max-w-none border-transparent md:border-white/10 md:border-t md:pt-5 text-center font-gordita text-[13px] sm:text-[10px] md:text-[12px] leading-[23px] text-white uppercase break-words">
                            <p>©2026 All Rights Reserved</p>
                            <p className="mt-1">
                                This independent <span className="text-[#FD2A05] font-black">TEDx</span> event is operated <br className="md:hidden" />
                                <span className="italic md:not-italic">under license from</span>{' '}
                                <span className="text-[#FD2A05] font-black">TED</span>
                            </p>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
        </ZoomNormalizer>
    )
}

export default ArtSubmissionPage