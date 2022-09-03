import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ControlPanel from '../../components/Dashboard/ControlPanel';
import Dashboard from '../../components/Dashboard/Dashboard';

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  if (!session) {
    return <div>Access denied. Please sign in.</div>;
  }

  return (
    <div className="flex mt-5">
      <div className="grow-0 bg-gray-200">
        <ControlPanel />
      </div>
      <div className="grow">
        <div className="flex flex-col justify-between px-5 mb-10 gap-5">
          <h2 className="text-4xl mb-14">Welcome, {session.user?.name}</h2>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
