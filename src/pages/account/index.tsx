import { router } from "@trpc/server";
import { Button } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AccountPage() {
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // for now, redirect to login page
      // can change later if we want to redirect to home
      router.push('/auth/login')
    }
  }, [session])

  return (
    <div>
      <h2>Account Page</h2>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}