import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <div className="text-4xl font-extrabold">
          <Link href="/">CarbonCalc</Link>
        </div>

        <div className="flex">
          <ul className="hidden sm:flex font-bold md:text-2xl">
            <li className="px-4 ">
              <Link href="/fuel">Fuel</Link>
            </li>
            <li className="px-4">
              <Link href="/electricity">Electricity</Link>
            </li>
            <li className="px-4">
              <Link href="/travel">Travel</Link>
            </li>
            {session && (
              <li className="px-4 ">
                <Link href="/account">Profile</Link>
              </li>
            )}
            {!session && (
              <li className="px-4">
                <Link href="/auth/login">Login</Link>
              </li>
            )}
          </ul>
          {/* MOBILE BUTTON */}
          <div
            onClick={handleNav}
            className="sm:hidden block z-[100] text-green cursor-pointer"
          >
            {nav ? <MdClose size={20} /> : <HiMenuAlt3 size={20} />}
          </div>
        </div>
        {/* MOBILE MENU */}
        <div
          className={
            nav
              ? `sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-gray text-center text-white ease-in duration-300 z-50`
              : `sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-gray text-center text-white ease-in duration-300 z-50`
          }
        >
          <ul>
            {session && (
              <li onClick={handleNav} className="p-4 text-4xl hover:text-green">
                <Link href="/account">Profile</Link>
              </li>
            )}
            {!session && (
              <li onClick={handleNav} className="p-4 text-4xl hover:text-green">
                <Link href="/auth/login">Log in</Link>
              </li>
            )}
            <li onClick={handleNav} className="p-4 text-4xl hover:text-green">
              <Link href="/fuel">Fuel</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-green">
              <Link href="/electricity">Electricity</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-green">
              <Link href="/travel">Travel</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
