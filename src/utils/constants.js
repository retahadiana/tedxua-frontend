// Data navigasi Navbar utama.
// "dropdown" opsional -> jika ada, item akan menampilkan submenu saat hover/klik.
export const NAV_LINKS = [
    {
        label: 'About',
        path: '/about',
        dropdown: [
            { label: 'About Us', path: '/about/us' },
            { label: 'This Year Theme', path: '/about/theme' },
        ],
    },
    {
        label: 'Events',
        path: '/events',
        dropdown: [
            { label: 'Pre-Event 1', path: '/events/pre-event-1' },
            { label: 'Pre-Event 2', path: '/events/pre-event-2' },
            { label: 'Main Event', path: '/events/main-event' },
        ],
    },
    { label: 'LFSS', path: '/lfss' },
    { label: 'Art Showcase', path: '/art-showcase' },
    { label: 'Shops', path: '/merchandise' },
    { label: 'Sponsorship', path: '/sponsorship' },
]