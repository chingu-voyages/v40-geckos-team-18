import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <>
      <footer className="bg-green p-12">
        <div className="flex justify-start sm:space-x-24">
          <div className="hidden sm:flex flex-col">
            <h1 className="text-xl font-bold mb-4">LINKS</h1>
            <p className="">
              <Link href="/">Link 1</Link>
            </p>
            <p className="">
              <Link href="/">Link 2</Link>
            </p>
            <p className="">
              <Link href="/">Link 3</Link>
            </p>
          </div>

          <div className="hidden sm:flex flex-col">
            <h1 className="text-xl font-bold mb-4">CREDITS</h1>
            <p className="">
              <Link href="/">Link 1</Link>
            </p>
            <p className="">
              <Link href="/">Link 2</Link>
            </p>
            <p className="">
              <Link href="/">Link 3</Link>
            </p>
          </div>

          <div className="">
            <h1 className="text-xl font-bold mb-4">OUR TEAM</h1>
            <p className="">
              <Link href="/">Link 1</Link>
            </p>
            <p className="">
              <Link href="/">Link 2</Link>
            </p>
            <p className="">
              <Link href="/">Link 3</Link>
            </p>
            <p className="">
              <Link href="/">Link 4</Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-gray-700 font-light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
          vero libero? Quibusdam, facere necessitatibus dolorem quisquam iusto
          repellendus nostrum omnis modi! Reprehenderit sit reiciendis minima
          repellendus nobis repellat id et vel officia architecto? Quaerat in
          sunt at veniam eos sapiente necessitatibus delectus repudiandae
          inventore mollitia.
        </p>
      </footer>
    </>
  );
};

export default Footer;
