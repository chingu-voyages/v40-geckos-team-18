import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="footer p-12">
        <div className="flex justify-start sm:space-x-24">
          <div className="hidden sm:flex flex-col">
            <h1 className="text-xl font-bold mb-4">LINKS</h1>
            <p className="">
              <Link href="https://docs.carboninterface.com/#/">Carbon Emissions API</Link>
            </p>
            <p className="">
              <Link href="https://www.chingu.io">Chingu</Link>
            </p>
           
          </div>

          <div className="">
            <h1 className="text-xl font-bold mb-4">OUR TEAM</h1>
            <p className="">
              <Link href="/">Ticia D.</Link>
            </p>
            <p className="">
              <Link href="/">Ivan Alejandre</Link>
            </p>
            <p className="">
              <Link href="/">Tramy Phan</Link>
            </p>
            <p className="">
              <Link href="https://www.linkedin.com/in/amandavieiradev/">Amanda Vieira</Link>
            </p>
            <p className="">
              <Link href="/">Cian</Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-gray-700 font-light">
          CarbonCalc is a web app created by a team of volunteers from <Link href="https://chingu.io">Chingu</Link>, using the T3 Stack. <Link href="https://www.chingu.io/howItWorks">Click here to know more about how Chingu works. </Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;
