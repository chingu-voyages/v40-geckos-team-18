import Link from 'next/link';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from 'flowbite-react';

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}</p>
        <Button onClick={() => signOut()}>Log Out</Button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href="/">Home</Link>
      </nav>
      <h2>Login Page</h2>
      <p>if sucessfully logged in, this page should redirect to account page</p>
      <Button onClick={() => signIn()}>Log in</Button>
    </div>
  );
}
