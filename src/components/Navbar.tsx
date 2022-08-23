import Link from 'next/link';
import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <div className="">
        <Link href="/">CarbonCalc</Link>
      </div>

      <div>
        <div>
          <HiMenuAlt3 className="sm:hidden" size={20} />
        </div>
        <div className="hidden sm:flex">
          <p className="px-4">
            <Link href="/">Start Here</Link>
          </p>
          <p className="px-4">
            <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
