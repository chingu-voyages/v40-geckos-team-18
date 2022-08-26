import {
  useSession,
  signIn,
  signOut,
  ClientSafeProvider,
  getProviders,
  getCsrfToken,
} from 'next-auth/react';
import { Button, Label, TextInput } from 'flowbite-react';
import { CtxOrReq } from 'next-auth/client/_utils';
import Head from 'next/head';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import plantImage from '../../assets/images/holding-plant-removebg-preview.png';
import { InferGetServerSidePropsType } from 'next';

interface LoginPageProps {
  providers: ClientSafeProvider[];
  csrfToken: string;
}

export default function LoginPage({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <h1 className="mt-8 text-3xl mb-14">Log in</h1> */}

      <div className="mb-8">
        <Image
          src={plantImage}
          alt="person holding a plant"
          width={400}
          height={400}
        />
      </div>

      <div className="mb-10 ">
        <form method='POST' action='/api/auth/signin/email'>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="w-72 mb-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Log in with your email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="flex justify-center">
            <Button color="success" type='submit'>Login</Button>
          </div>
        </form>
      </div>

      <h1 className="mb-4 text-center">-OR-</h1>
      <>
        {providers
          ? Object.values(providers).map((provider) => {
              if (provider.id !== 'email') {
                return (
                  <div key={provider.name}>
                    <Button onClick={() => signIn(provider.id)} color="info">
                      Sign in with {provider.name}
                      {getProviderIcon(provider)}
                    </Button>
                  </div>
                );
              }
            })
          : ''}
      </>
    </div>
  );
}

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
};

const getProviderIcon = (provider: ClientSafeProvider) => {
  switch (provider.name) {
    case 'Google':
      return <FaGoogle className="ml-2" />;
    default:
      return;
  }
};
