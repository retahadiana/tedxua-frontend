import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ComingSoon, PreEventOne } from './features/events'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComingSoon />,
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/pre-event-1',
    element: <PreEventOne />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
