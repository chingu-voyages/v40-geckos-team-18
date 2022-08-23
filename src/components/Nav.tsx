import React, { useState } from 'react';
import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const Nav = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <h1 className="text-xl font-bold text-gray">CarbonCalc</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/">Start Here</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <nav className="flex justify-between items-center p-4">
        <div className="text-4xl font-bold">
          <Link href="/">CarbonCalc</Link>
        </div>

        <div className="flex">
          <ul className="hidden sm:flex">
            <li className="px-4 ">
              <Link href="/">Start Here</Link>
            </li>
            <li className="px-4">
              <Link href="/login">Login</Link>
            </li>
          </ul>
          {/* MOBILE BUTTON */}
          <div
            onClick={handleNav}
            className="sm:hidden block z-10 text-green cursor-pointer"
          >
            {nav ? <MdClose size={20} /> : <HiMenuAlt3 size={20} />}
          </div>
        </div>
        {/* MOBILE MENU */}
        <div
          className={
            nav
              ? `sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center text-white ease-in duration-300`
              : `sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center text-white ease-in duration-300`
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/register">Profile</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/fuel">Fuel</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/electricity">Electricity</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/travel">Travel</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
