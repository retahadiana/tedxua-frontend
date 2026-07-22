import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen flex flex-col justify-between bg-black text-white">
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <h1 className="text-5xl font-extrabold text-ted-red mb-4 tracking-tight">TEDx Universitas Airlangga 2026</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Selamat datang di cetak biru resmi website TEDxUA 2026. Struktur Clean Architecture &amp; Feature-Driven Design telah berhasil diinisialisasi.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://vitejs.dev" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-ted-grey hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                Dokumentasi Vite
              </a>
              <a 
                href="https://tailwindcss.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-ted-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                Dokumentasi Tailwind
              </a>
            </div>
          </div>
        </main>
      </div>
    ),
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
