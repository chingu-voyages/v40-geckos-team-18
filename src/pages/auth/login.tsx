import {
  useSession,
  signIn,
  ClientSafeProvider,
  getProviders,
  getCsrfToken,
} from 'next-auth/react';
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { CtxOrReq } from 'next-auth/client/_utils';
import Head from 'next/head';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import plantImage from '../../assets/images/holding-plant.png';
import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/account');
    }
  }, [session, router]);

  if (status === 'loading')
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner" size="xl" />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/** TODO: MISSING NAV BAR */}

      <div className="mb-8">
        <Image
          src={plantImage}
          alt="person holding a plant"
          width={400}
          height={400}
        />
      </div>

      <div className="max-w-4xl">
        <Card>
          <div className='px-10 py-5 flex flex-col items-center'>
            <div className="mb-10">
              <form method="POST" action="/api/auth/signin/email">
                {/** required for email login */}
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <div className="w-72 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Log in with your email"/>
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                  />
                </div>

                <div className="flex justify-center">
                  <Button color="success" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>

            <h1 className="mb-4 text-center">-OR-</h1>
            <>
              {providers
                ? Object.values(providers).map((provider) => {
                    if (provider.id !== 'email') {
                      return (
                        <div key={provider.name} className="mb-2">
                          <Button
                            onClick={() => signIn(provider.id)}
                            color="info"
                          >
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
        </Card>
      </div>

      {/** TODO: MISSING FOOTER */}
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
    case 'Facebook':
      return <BsFacebook className="ml-2" />;
    case 'GitHub':
      return <BsGithub className="ml-2" />;
    default:
      return;
  }
};
