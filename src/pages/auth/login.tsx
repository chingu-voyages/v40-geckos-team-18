import {
  useSession,
  signIn,
  signOut,
  ClientSafeProvider,
  getProviders,
  getCsrfToken,
} from 'next-auth/react';
import { Button } from 'flowbite-react';
import { CtxOrReq } from 'next-auth/client/_utils';

interface LoginPageProps {
  providers: ClientSafeProvider[];
  csrfToken: string
}

export default function LoginPage({ providers, csrfToken }: LoginPageProps) {
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
    <div className='flex flex-col justify-center items-center'>
      <h1>Log in</h1>

      <form>
        <input name='csrfToken' type="hidden" defaultValue={csrfToken}/>
        
      </form>
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </>
      {/* <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href="/">Home</Link>
      </nav>
      <h2>Login Page</h2>
      <p>if sucessfully logged in, this page should redirect to account page</p>
      <Button onClick={() => signIn()}>Log in</Button> */}
    </div>
  );
}

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {providers, csrfToken}
  }
}