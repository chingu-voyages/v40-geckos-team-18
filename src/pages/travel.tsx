import Link from 'next/link'
import Head from 'next/head'

export default function TravelPage() {
  return (
    <div>
      <Head>
        <title>Travel Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href='/'>Home</Link>
      </nav>
      <h2>Travel Page</h2>
    </div>
  )
}