import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aura-Do | Flow State',
  description: 'High-performance sci-fi to-do app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen relative">
        {/* Background ambient glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aura-neonCyan/20 rounded-full blur-[120px] pointer-events-none z-[-1]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aura-neonPurple/20 rounded-full blur-[120px] pointer-events-none z-[-1]" />
        
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
