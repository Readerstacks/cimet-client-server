import './globals.css'
 

export const metadata = {
  title: 'Cimet',
  description: 'Cimet task for developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
