import React from 'react'
import { Navbar, Footer } from '@/components/layout'
import { motion } from 'framer-motion'
import iconTitle from '@/assets/art show/icon title.png'
import elipsSubmission from '@/assets/art show/elips submission.png'
import fontTitle from '@/assets/art show/font title.png'
import buttonSubmission from '@/assets/art show/button submission.png'
import buttonGuidebook from '@/assets/art show/button guidebook.png'
import bgBawah from '@/assets/art show/bg bawah.png'
import rumputCoklat from '@/assets/art show/rumput coklat.png'
import lightHp from '@/assets/art show/light hp.png'
import fotoHp from '@/assets/art show/foto hp.png'
import whatIsArtExhibition from '@/assets/art show/WHAT IS ART EXHIBITION_.png'
import theme from '@/assets/art show/Theme.png'
import termsCondition from '@/assets/art show/Terms n condition.png'
import submissionRequirement from '@/assets/art show/Submission requirement.png'
import lastBenefit from '@/assets/art show/last Benefit.png'
import st1 from '@/assets/art show/st1.png'
import st2 from '@/assets/art show/st2.png'
import st3 from '@/assets/art show/st3.png'

const SUBMISSION_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSeBp2GRDbZgENWG2LXJGYcWW5etPctzbJANeSVd0kO34gpxzg/viewform?usp=publish-editor'
const GUIDEBOOK_URL =
    'https://drive.google.com/drive/folders/1zs-eezkSnSo6x7qJHHtm64O33nDg8yMj'

const listClass =
    'font-essays text-[#FFF4EA] leading-[1.5] space-y-3 list-decimal list-outside pl-6 w-full text-[15px]'

export function ArtSubmissionMobile() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between bg-[#0E1A06] text-white overflow-x-hidden">
            <Navbar />

            {/* SECTION 1: Hero */}
            <section className="relative w-full pt-24 pb-10 overflow-hidden">
                {/* Elips background */}
                <img
                    src={elipsSubmission}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-[120px] left-1/2 -translate-x-1/2 z-0 pointer-events-none w-[140vw] max-w-[650px] h-auto -rotate-[10deg]"
                />

                <div className="relative z-10 flex flex-col items-center px-4">
                    {/* Font title */}
                    <motion.img
                        src={fontTitle}
                        alt="Art Showcase Title"
                        className="w-[80vw] max-w-[340px] h-auto object-contain pointer-events-none mt-[60px]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                    {/* Icon title */}
                    <motion.img
                        src={iconTitle}
                        alt="Art Showcase"
                        className="w-[150vw] max-w-[580px] h-auto object-contain pointer-events-none mt-[-96px] relative left-[100px] z-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    />
                
                    {/* Rumput coklat: lebar penuh, mepet kiri-kanan */}
                    <motion.img
                        src={rumputCoklat}
                        alt=""
                        aria-hidden="true"
                        className="relative block w-[200vw] max-w-none h-auto pointer-events-none mt-[-85px] z-40"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    />
                
                    {/* Buttons */}
                    <div className="flex flex-row gap-4 mt-[-80px] w-full justify-center relative z-50">
                        <a href={SUBMISSION_URL} target="_blank" rel="noopener noreferrer">
                            <motion.img
                                src={buttonSubmission}
                                alt="Submission Link"
                                className="h-14 w-auto object-contain active:scale-95 transition-transform"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                            />
                        </a>
                        <a href={GUIDEBOOK_URL} target="_blank" rel="noopener noreferrer">
                            <motion.img
                                src={buttonGuidebook}
                                alt="Guidebook"
                                className="h-14 w-auto object-contain active:scale-95 transition-transform"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                            />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="relative w-full">
                {/* Background */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none -top-[315px]"
                    style={{
                        backgroundImage: `url(${bgBawah})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-20 w-full px-4 py-12">
                    {/* What is Art Showcase */}
                    <motion.div
                        className="relative text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img
                            src={lightHp}
                            alt=""
                            aria-hidden="true"
                            className="absolute top-[-65px] left-1/2 -translate-x-1/2 z-50 w-[100vw] max-w-none h-auto object-contain pointer-events-none"
                        />
                        <img
                            src={whatIsArtExhibition}
                            alt="What is Art Showcase"
                            className="w-auto max-w-[90%] h-auto object-contain mx-auto relative z-40"
                        />
                        <p
                            className="mt-6 text-[#FFF4EA] leading-[1.5] text-justify font-essays max-w-[92%] pl-[20px]"
                            style={{ fontSize: 'clamp(14px, 4vw, 18px)' }}
                        >
                            The Art Showcase at TEDxUniversitasAirlangga 2026 is more than just a space to display artworks. It is a place to look beyond what is visible and notice the stories, connections, and processes that quietly shape who we become.
                            <br /><br />
                            Guided by our theme Beneath What We See: The Mycelium, this showcase draws inspiration from mycelium, a network that grows beneath the surface, connecting and supporting what we see above it. Much like mycelium, our lives are shaped by things that are not always visible: the people we meet, the experiences we carry, and the connections that continue to grow over time.
                            <br /><br />
                            Through this showcase, artworks can explore the many things that exist beneath the surface of our everyday lives. We invite artists to bring their own interpretation of what lies beneath the surface. Share the stories, connections, and moments that have shaped you, and let your artwork become a part of this growing network.
                        </p>
                    </motion.div>

                    {/* Foto HP above Theme */}
                    <motion.div
                        className="relative text-center mt-10 z-60"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img
                            src={fotoHp}
                            alt="Phone mockup"
                            className="w-auto max-w-[155%] h-auto object-contain mx-auto -ml-[80px] relative z-[9999]"
                        />
                    </motion.div>

                    {/* Theme */}
                    <motion.div
                        className="text-center mt-14 relative z-[9999]"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img
                            src={theme}
                            alt="Theme"
                            className="w-auto max-w-[90%] h-auto object-contain mx-auto"
                        />
                    </motion.div>

                    {/* ST cards: ditumpuk vertikal */}
                    <div className="mt-10 flex flex-col items-center gap-5 relative z-[9999]">
                        {[st1, st2, st3].map((src, i) => (
                            <motion.img
                                key={i}
                                src={src}
                                alt={`ST${i + 1}`}
                                className="w-auto max-w-[88vw] h-auto object-contain"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                            />
                        ))}
                    </div>

                    {/* Terms, Benefit, Requirement */}
                    <div className="mt-16 text-left max-w-[600px] mx-auto w-full">
                        <img
                            src={termsCondition}
                            alt="Terms N Condition"
                            className="w-auto max-w-[90%] h-auto object-contain mb-6 mx-auto"
                        />
                        <ol className={listClass}>
                            <li>Artwork submission is open for public.</li>
                            <li>There are no restrictions on the form and media of the art submission.</li>
                            <li>The artist is responsible for the originality of the submitted work. If the artist uses material from other sources (plagiarism, copycat, etc.), a statement from the original owner must be made, and TEDxUniversitasAirlangga is not responsible for any commotion made.</li>
                            <li>By submitting your artwork to TEDxUniversitasAirlangga 2026, you have given us license to use, promote, and display your Artwork for commercial and non-commercial purposes throughout upcoming events.</li>
                            <li>Artworks that have previously been included in other showcases are allowed to be submitted.</li>
                            <li>
                                Artists must include a statement of registration for the Art Showcase Submission TEDxUniversitasAirlangga 2026 by downloading the template below:{' '}
                                <a href="#" className="underline font-swung text-[#FFF4EA]">
                                    STATEMENT AND AGREEMENT OF ART SHOWCASE REGISTRATION
                                </a>
                            </li>
                        </ol>

                        <img
                            src={lastBenefit}
                            alt="Benefit"
                            className="w-auto max-w-[70%] h-auto object-contain mt-12 mb-6 mx-auto"
                        />
                        <ol className={listClass}>
                            <li>Main Event TEDxUniversitasAirlangga 2026 1 free pass ticket</li>
                            <li>Certificate.</li>
                        </ol>

                        <img
                            src={submissionRequirement}
                            alt="Submission Requirement"
                            className="w-auto max-w-[90%] h-auto object-contain mt-12 mb-6 mx-auto"
                        />
                        <ol className={listClass}>
                            <li>Self portrait.</li>
                            <li>Brief biography of the artists (maximum 100 words). (.pdf)</li>
                            <li>Permission letter of art copyright. (.pdf) (optional)</li>
                            <li>Description of the submitted artworks.</li>
                            <li>Photo or/and video of submitted artworks.</li>
                            <li>Artist's statement including meaning and issues that are brought up through the artwork.</li>
                        </ol>
                    </div>
                </div>

                {/* Footer */}
                <Footer className="relative z-20 w-full" />
            </section>
        </div>
    )
}

export default ArtSubmissionMobile
