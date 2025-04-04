import './globals.css'
import type { Metadata } from 'next'
import { Alata, Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '600', '700'],
  variable: '--font-poppins',
})
const alata = Alata({
  subsets: ['latin'],
  variable: '--font-alata',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Baita Soluções',
    default: 'Baita Soluções',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} ${alata.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
