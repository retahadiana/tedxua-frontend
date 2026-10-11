import { useState, useEffect } from 'react'
import { ArtSubmissionDesktop } from './ArtSubmissionDesktop.jsx'
import { ArtSubmissionMobile } from './ArtSubmissionMobile.jsx'

export function ArtSubmissionPage() {
    const query = '(max-width: 639px)'
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    )

    useEffect(() => {
        const mq = window.matchMedia(query)
        const onChange = () => setIsMobile(mq.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    return isMobile ? <ArtSubmissionMobile /> : <ArtSubmissionDesktop />
}

export default ArtSubmissionPage