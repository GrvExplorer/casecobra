import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import styles from './layout.module.css'
 

const inter = Inter({ subsets: ['latin'] })
    
export const metadata = {
  title: 'Learning Next.js',
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.container}`}>
        <Navbar />
        <div className={`${styles.content}`}>
        {children}
        <Footer />
        </div>
        </body>
    </html>
  )
}