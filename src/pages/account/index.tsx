import { Spinner } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import Dashboard from '../../components/Account/Dashboard';
import AccountLayout from '../../layouts/AccountLayout';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

const AccountPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const greetingMessage = `Welcome, ${session?.user?.name}`;

  const { data: emissionsSummaryData, isLoading: isEmissionsLoading } =
    trpc.useQuery(['dashboard.summary']);

  const { data: userPreferences, isLoading: isPreferencesLoading } =
    trpc.useQuery(['preferences.get-preferences']);

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session]);

  if (!session) {
    return <div>Access denied. Please sign in.</div>;
  }

  if (isEmissionsLoading || isPreferencesLoading) return <Spinner />;

  return (
    <Dashboard
      greeting={greetingMessage}
      emissionsSummaryData={emissionsSummaryData}
      unitPreference={userPreferences!.unitPref} // DB value defaulted to metric, always present
    />
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default AccountPage;
