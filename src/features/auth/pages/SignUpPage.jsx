import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock } from 'lucide-react'
import AuthInput from '../components/AuthInput'
import AuthButton from '../components/AuthButton'

function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

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
          <h1 className="text-3xl font-bold text-white">Daftar</h1>
          <p className="mt-2 text-sm text-neutral-400">Buat akun untuk mulai bergabung di TEDxUA</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
        >
          <AuthInput
            label="Nama Lengkap"
            name="name"
            type="text"
            icon={User}
            placeholder="Nama lengkap"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
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
            placeholder="Buat kata sandi"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <AuthInput
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            type="password"
            icon={Lock}
            placeholder="Ulangi kata sandi"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <AuthButton>Daftar</AuthButton>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Sudah punya akun?{' '}
          <Link to="/sign-in" className="font-semibold text-white hover:underline">
            Masuk
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUpPage
