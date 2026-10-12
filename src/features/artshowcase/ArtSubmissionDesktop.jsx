import React, { useState, useEffect } from 'react'
import { Navbar, Footer } from '@/components/layout'
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
import { cn } from '@/utils/cn'

export function ArtSubmissionDesktop() {
    const [shouldFlicker, setShouldFlicker] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShouldFlicker(true), 7000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col justify-between bg-[#0E1A06] text-white overflow-x-hidden">
            <Navbar />

            {/* SECTION 1: Hero */}
            <section className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] xl:h-[820px] pt-20 overflow-hidden">
                {/* Elips background - mobile: smaller, centered, higher */}
                <img
                    src={elipsSubmission}
                    alt=""
                    className="sm:hidden absolute top-[200px] left-1/2 -translate-x-1/2 z-0 pointer-events-none w-[90vw] max-w-[500px] h-auto"
                    aria-hidden="true"
                />

                {/* Main content container - z-10 */}
                <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
                    {/* Desktop absolute positioning wrapper */}
                    <div className="hidden sm:block relative w-full max-w-[1400px] -mt-[134px] sm:-mt-[102px]">
                        {/* Icon Title - DESKTOP: absolute left */}
                        <motion.img
                            src={iconTitle}
                            alt="Art Showcase"
                            className="w-auto max-w-[850px] h-auto object-contain pointer-events-none relative z-30 absolute top-0 left-0 -translate-y-[370px] sm:-ml-[40px] md:-ml-[70px] xl:-ml-[120px]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        />

                        {/* Font Title + Buttons - DESKTOP: absolute right */}
                        <div className="flex flex-col items-start gap-4 relative z-20 absolute right-0 top-0 sm:translate-x-[240px] md:translate-x-[320px] lg:translate-x-[380px] xl:translate-x-[450px] -translate-y-[500px] w-[600px]">
                            {/* Elips background - locked directly behind font title */}
                            <div
                                className="absolute -top-[75px] -left-[160px] z-0 pointer-events-none w-[1000px] h-[700px] max-h-[700px] rotate-[-10deg]"
                                style={{
                                    backgroundImage: `url(${elipsSubmission})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center top',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                aria-hidden="true"
                            />

                            {/* Font Title */}
                            <motion.img
                                src={fontTitle}
                                alt="Art Exhibition Title"
                                className="w-auto max-w-[650px] h-auto object-contain pointer-events-none relative z-10"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />

                            {/* Buttons below font title */}
                            <div className="flex flex-row gap-[40px] relative z-60 mt-[30px] sm:ml-[60px] md:ml-[120px] xl:ml-[200px]">
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

                        {/* Font Title + Buttons - MOBILE: centered */}
                        <div className="sm:hidden flex flex-col items-center gap-4 w-full mt-8">
                            <motion.img
                                src={fontTitle}
                                alt="Art Exhibition Title"
                                className="w-auto max-w-[80vw] h-auto object-contain pointer-events-none mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                            <div className="flex flex-row gap-[40px] relative z-60 mt-6 w-full justify-center">
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSeBp2GRDbZgENWG2LXJGYcWW5etPctzbJANeSVd0kO34gpxzg/viewform?usp=publish-editor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <motion.img
                                        src={buttonSubmission}
                                        alt="Submission Link"
                                        className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(235,0,40,0.6)] active:scale-95"
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
                                        className="h-14 w-auto object-contain cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(235,0,40,0.6)] active:scale-95"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rumput Coklat - anchored to bottom of Section 1 */}
                <motion.img
                    src={rumputCoklat}
                    alt=""
                    className="absolute bottom-0 left-0 w-full h-auto max-h-[clamp(140px,18vw,260px)] object-cover object-top pointer-events-none z-30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                />
            </section>

            {/* SECTION 2: bg bawah as background with all content overlaying on top */}
            {/* Kamu bisa atur lebar (w-full / max-w-[...]) dan tinggi (h-[...] / min-h-[...]) di className atau via style */}
            <section
                className="relative w-full"
            >
                {/* bg bawah - z-0 (background) */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none -top-[240px]"
                    style={{
                        backgroundImage: `url(${bgBawah})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />

                {/* Light - DESKTOP & TABLET */}
                <motion.img
                    key="light-desktop"
                    src={light}
                    alt="Light"
                    className="w-[1000px] lg:w-[1250px] xl:w-[1440px] max-w-none h-auto object-contain absolute top-0 left-1/2 pointer-events-none z-10"
                    initial={{ opacity: 1, x: "-50%" }}
                    animate={shouldFlicker
                        ? {
                            opacity: [
                                1, 0.1, 1, 0.05, 1, 0.15, 1, 0.08, 1, 0.12, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                            ],
                            x: "-50%"
                        }
                        : { opacity: 1, x: "-50%" }}
                    transition={shouldFlicker
                        ? { duration: 8, ease: "linear", repeat: Infinity, repeatDelay: 0 }
                        : { duration: 0.5 }}
                />

                {/* Content container - z-20 */}
                <div className="relative z-20 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 pt-16 sm:pt-24 lg:pt-60 pb-6 sm:pb-10">
                    {/* What is Art Exhibition */}
                    <div className="text-center sm:translate-x-20">
                        <motion.img
                            src={whatIsArtExhibition}
                            alt="What is Art Exhibition"
                            className="w-auto max-w-[85%] sm:max-w-[480px] lg:max-w-[580px] xl:max-w-[640px] h-auto object-contain relative z-20 mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        />
                        <motion.p
                            className="mt-6 sm:mt-8 text-[#FFF4EA] leading-[1.6] text-justify font-essays max-w-[420px] lg:max-w-[490px] xl:max-w-[550px] mx-auto px-4 relative z-20"
                            style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            The Art Showcase at TEDxUniversitasAirlangga 2026 is more than just a space to display artworks. It is a place to look beyond what is visible and notice the stories, connections, and processes that quietly shape who we become.
                            <br /><br />
                            Guided by our theme Beneath What We See: The Mycelium, this exhibition draws inspiration from mycelium, a network that grows beneath the surface, connecting and supporting what we see above it. Much like mycelium, our lives are shaped by things that are not always visible: the people we meet, the experiences we carry, and the connections that continue to grow over time.
                            <br /><br />
                            Through this exhibition, artworks can explore the many things that exist beneath the surface of our everyday lives. We invite artists to bring their own interpretation of what lies beneath the surface. Share the stories, connections, and moments that have shaped you, and let your artwork become a part of this growing network.
                        </motion.p>
                    </div>

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
                </div>

                {/* Footer */}
                <Footer className="relative z-20 w-full" />
            </section>
        </div>
    )
}

export default ArtSubmissionDesktop