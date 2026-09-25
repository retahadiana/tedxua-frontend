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
        <div className="w-full bg-[#16220E] text-white overflow-x-hidden">
            <Navbar />
            
            {/* SECTION 1: Hero with elips background */}
            <section className="relative w-full min-h-screen pt-20">
                {/* Elips background - z-0 */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none sm:hidden"
                    style={{
                        backgroundImage: `url(${elipsSubmission})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />
                {/* Desktop elips */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none hidden sm:block"
                    style={{
                        backgroundImage: `url(${elipsSubmission})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />
                
                {/* Main content container - z-10 */}
                <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
                    {/* Font Title - z-10 (on top of elips) */}
                    <motion.img
                        src={fontTitle}
                        alt="Art Exhibition Title"
                        className="w-auto max-w-[90vw] sm:max-w-[50vw] h-auto object-contain sm:h-[50vh] sm:max-h-[400px] mt-8 sm:mt-16 pointer-events-none relative z-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    
                    {/* Icon Title - centered, z-10 */}
                    <motion.img
                        src={iconTitle}
                        alt="Art Showcase"
                        className="w-auto max-w-[90vw] sm:max-w-[100vw] h-auto object-contain mt-4 sm:mt-8 pointer-events-none relative z-10 mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                    
                    {/* Rumput Coklat - full width, right below icon title, z-50 */}
                    <motion.img
                        src={rumputCoklat}
                        alt=""
                        className="w-full h-auto object-cover mt-4 sm:mt-8 pointer-events-none relative z-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Buttons - on top of rumput coklat, z-60 */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-10 w-full sm:w-auto items-center sm:items-end mx-auto sm:mx-0 relative z-60 -mt-16 sm:-mt-20">
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
            </section>

            {/* SECTION 2: bg bawah as background with all content on top */}
            <section className="relative w-full -mt-[13px] sm:-mt-[23px]">
                {/* bg bawah - z-0 (background) */}
                <img
                    src={bgBawah}
                    alt=""
                    className="w-full h-auto object-cover relative z-0"
                />
                
                {/* Content container - z-60 (on top of bg bawah) */}
                <div className="relative z-60 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-12 sm:py-20">
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
                            className="w-[100vw] max-w-none h-auto object-contain mx-auto absolute -top-[13.8vw] left-1/2 -translate-x-1/2 -ml-[6.9vw] sm:-top-[20vw] sm:-ml-0 md:-top-[13.8vw] md:-ml-[6.9vw] transform scale-[1.15] z-10"
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
                            className="w-auto max-w-[90%] h-auto object-contain relative z-20 sm:max-w-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                        <motion.p
                            className="mt-8 text-[#FFF4EA] leading-[1.4] text-justify font-essays max-w-[520px] mx-auto px-4 sm:ml-0 relative z-20"
                            style={{ fontSize: 'clamp(16px, 1.5vw, 24px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            "A highlight of TEDxUniversitasAirlangga 2026, The Art Showcase is dedicated to displaying the diverse talents of local artists. More than just a display, this exhibition is a dynamic platform where art and community converge. Artists receive an open space to share their stories in a variety of mediums, and each piece invites audiences to connect with the powerful stories behind the work. This is an open call to all artists: let your voices resonate and be heard!"
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
                        className="mt-12 sm:mt-16 flex flex-col items-center gap-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.img src={st1} alt="ST1" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20"
                            initial={{ opacity: 0, y: 30, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        />
                        <motion.img src={st2} alt="ST2" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                        <motion.img src={st3} alt="ST3" className="w-auto max-w-[90vw] sm:max-w-[370px] h-auto object-contain cursor-pointer relative z-20"
                            initial={{ opacity: 0, y: 30, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                    </motion.div>
                    
                    {/* Terms & Conditions - z-10 */}
                    <motion.div
                        className="mt-16 sm:mt-24 text-left max-w-[900px] mx-auto w-full px-4 relative z-10"
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
                            src={submissionRequirement}
                            alt="Submission Requirement"
                            className="w-auto max-w-full h-auto object-contain mt-12 mb-8 mx-auto"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
                            src={lastBenefit}
                            alt="Benefit"
                            className="w-auto max-w-[90vw] sm:max-w-full h-auto object-contain mt-12 mb-8 mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
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
    )
}

export default ArtSubmissionPage