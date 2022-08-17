import Link from 'next/link'
import Head from 'next/head'

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href='/'>Home</Link>
      </nav>
      <h2>Login Page</h2>
      <p>if sucessfully logged in, this page should redirect to account page</p>
    </div>
  )
}