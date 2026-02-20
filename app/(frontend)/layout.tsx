import { Inter, Roboto_Mono } from 'next/font/google'

import React from 'react'
import './styles.css'
import Header from './_layout/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

// import Link from 'next/link';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body
             className={`${inter.variable} 
             ${roboto_mono.variable} 
             antialiased font-sans`}>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
