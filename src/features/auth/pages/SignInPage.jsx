import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import AuthInput from '../components/AuthInput'
import AuthButton from '../components/AuthButton'

function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [remember, setRemember] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Masuk</h1>
          <p className="mt-2 text-sm text-neutral-400">Selamat datang kembali di TEDxUA</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
        >
          <AuthInput
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            placeholder="nama@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <AuthInput
            label="Kata Sandi"
            name="password"
            type="password"
            icon={Lock}
            placeholder="Masukkan kata sandi"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-neutral-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-white"
              />
              Ingat saya
            </label>
            <a href="#" className="text-neutral-400 transition-colors hover:text-white">
              Lupa kata sandi?
            </a>
          </div>

          <AuthButton>Masuk</AuthButton>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Belum punya akun?{' '}
          <Link to="/sign-up" className="font-semibold text-white hover:underline">
            Daftar
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignInPage
