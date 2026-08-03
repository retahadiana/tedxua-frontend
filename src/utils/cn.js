/**
 * Menggabungkan className secara kondisional.
 * Menerima string, array, atau object { className: boolean }.
 *
 * Contoh:
 *  cn('px-4', isActive && 'text-ted-red', { hidden: !isOpen })
 */
export function cn(...inputs) {
    const classes = []

    for (const input of inputs) {
        if (!input) continue

        if (typeof input === 'string') {
            classes.push(input)
        } else if (Array.isArray(input)) {
            const nested = cn(...input)
            if (nested) classes.push(nested)
        } else if (typeof input === 'object') {
            for (const key in input) {
                if (input[key]) classes.push(key)
            }
        }
    }

    return classes.join(' ')
}

export default cn