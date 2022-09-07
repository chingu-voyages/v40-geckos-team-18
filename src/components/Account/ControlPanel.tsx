import React from 'react';
import { GoSettings } from 'react-icons/go';
import { MdDashboard } from 'react-icons/md';
import { CgLogOut } from 'react-icons/cg';
import { Tooltip } from 'flowbite-react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const ControlPanel = () => {
  const router = useRouter();
  const buttonSize = 50;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-start p-4">
      <Tooltip content="Dashboard">
        <MdDashboard
          onClick={() => {
            router.push('/account');
          }}
          size={buttonSize}
          className="cursor-pointer mb-5"
        />
      </Tooltip>

      <Tooltip content="Preferences">
        <GoSettings
          onClick={() => {
            router.push('/account/preferences');
          }}
          size={buttonSize}
          className="cursor-pointer hover:bg-gray-400 mb-5"
        />
      </Tooltip>

      <Tooltip content="Logout">
        <CgLogOut
          onClick={() => handleSignOut()}
          size={buttonSize}
          className="cursor-pointer hover:bg-gray-400 mb-5"
        />
      </Tooltip>
    </div>
  );
};

export default ControlPanel;
