import React from 'react';

export default function JoinCTA() {
    return (
        <section className="relative w-full flex flex-col items-center justify-end min-h-[500px] pt-10 pb-32 px-6 z-20">
            {/* Grass/Mushroom Decoration Placeholder - using CSS gradient for grass and simple text for now */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-green-900/50 to-transparent pointer-events-none"></div>
            
            <div className="text-center z-10 max-w-2xl mb-24">
                <h3 className="font-essays text-2xl md:text-3xl font-bold text-[#F3EEDC] drop-shadow-md mb-4 flex items-center justify-center gap-2">
                    <span className="text-xl">🌙</span> Join Title <span className="text-ted-red">TEDx</span> UNIVERSITAS AIRLANGGA
                </h3>
                <p className="font-gordita text-sm md:text-base text-white/90 leading-relaxed">
                    Let's collaborate Sponsor or partner with TEDxUniversitasAirlangga <br className="hidden md:block"/>
                    by contacting us at financetedxunair@gmail.com
                </p>
            </div>
        </section>
    );
}
