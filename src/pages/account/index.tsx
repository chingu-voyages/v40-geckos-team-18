import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import ControlPanel from '../../components/Account/ControlPanel';
import Dashboard from '../../components/Account/Dashboard';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const AccountPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const greetingMessage = `Welcome, ${session?.user?.name}`;

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session]);

  if (!session) {
    return <div>Access denied. Please sign in.</div>;
  }

  return <Dashboard greeting={greetingMessage} />;
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default AccountPage;
