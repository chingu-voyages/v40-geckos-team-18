import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="footer p-12">
        <div className="flex justify-start sm:space-x-24">
          <div className="hidden sm:flex flex-col">
            <h1 className="text-xl font-bold mb-4">LINKS</h1>
            <p>
              <Link href="https://docs.carboninterface.com/#/">
                Carbon Emissions API
              </Link>
            </p>
            <p>
              <Link href="https://www.chingu.io">Chingu</Link>
            </p>
            <p>
              <Link href="https://create.t3.gg">T3 Stack</Link>
            </p>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4">OUR TEAM</h1>
            <p>
              <Link href="https://www.linkedin.com/in/ticia-dunn/">
                Ticia Dunn
              </Link>
            </p>
            <p>
              <Link href="https://www.linkedin.com/mwlite/in/ivan-alejandre-035613156">
                Ivan Alejandre
              </Link>
            </p>
            <p>
              <Link href="https://www.linkedin.com/in/my-pham-5555b7112/">
                My Phan
              </Link>
            </p>
            <p>
              <Link href="https://www.linkedin.com/in/amandavieiradev/">
                Amanda Vieira
              </Link>
            </p>
            <p>
              <Link href="/">Cian</Link>
            </p>
            <p>
              <Link href="https://www.linkedin.com/in/victoriacheng15/">
                Victoria Cheng
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 text-gray font-light">
          CarbonCalc is a web app created by a team of volunteers from{' '}
          <Link href="https://chingu.io">Chingu</Link>, using the T3 Stack.{' '}
          <Link href="https://www.chingu.io/howItWorks">
            Click here to know more about how Chingu works.
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
