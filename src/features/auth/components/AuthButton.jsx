import { motion } from 'framer-motion'

function AuthButton({
  children,
  type = 'submit',
  variant = 'primary',
  disabled,
  onClick,
  className = '',
}) {
  const baseClasses =
    'w-full rounded-lg py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-neutral-300',
    outline: 'border border-neutral-700 bg-transparent text-white hover:bg-neutral-800',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default AuthButton
