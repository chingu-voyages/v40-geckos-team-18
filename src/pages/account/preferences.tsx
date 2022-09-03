import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { NextPageWithLayout } from '../_app';

const UserPreferences: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <div>
      User preferences
      <p>
        To be configured later to set a new user's country, state (if
        applicable), and vehicles
      </p>
      <Button onClick={() => {router.push('/account')}}>Dashboard</Button>
    </div>
  );
};

UserPreferences.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>
}

export default UserPreferences;
