import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import React from 'react';

const UserPreferences = () => {
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

export default UserPreferences;
