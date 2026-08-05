import React from 'react';
import { cn } from '@/utils/cn';

export default function LogoItem({ src, alt, className }) {
    return (
        <div className={cn("relative flex items-center justify-center w-[25vw] h-[25vw] md:w-[400px] md:h-[400px]", className)}>
            {src ? (
                <img 
                    src={src} 
                    alt={alt} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    style={{ 
                        maskImage: 'radial-gradient(circle, black 55%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 100%)'
                    }}
                />
            ) : (
                <div className="relative z-10 w-full h-full rounded-full bg-white/80 shadow-[0_0_40px_rgba(255,255,255,0.7)]"></div>
            )}
        </div>
    );
}
