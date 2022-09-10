import { router } from '@trpc/server';
import { Button, Spinner } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div>
        Access denied. Please sign in.
      </div>
    )
  }
  return (
    <div>
      <h2>Account Page</h2>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button
        onClick={() => {
          router.push('/account/preferences');
        }}
      >
        Preferences
      </Button>
    </div>
  );
}

