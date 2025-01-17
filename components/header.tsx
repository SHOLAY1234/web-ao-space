// header.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { lazy, Suspense, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import Wallet from './wallet';

// Use lazy and Suspense for dynamic import
const ConnectButton = lazy(() => import('./connect-button'));

const Header: React.FC = () => {
  const { connected } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 text-white rounded-30px mt-4 sm:h-24">
      {/* Logo */}
      <h1 className="m-0 mb-4 sm:mb-0">
        <Link href="https://amigos-odyssey.com/" target="_blank">
          <img src="/logo.jpg" alt="Logo" className="h-14 sm:h-14 w-auto rounded-md" />
        </Link>
      </h1>

      {/* Buttons - Responsive Hamburger Menu */}
      <div className={`sm:hidden ${menuOpen ? 'flex flex-col' : 'hidden'}`}>
        <a
          href="https://twitter.com"
          className="btn-twitter text- fontblack-bold hover:text-black hover:bg-green-600 my-2 rounded-30px"
        >
          AO Click
        </a>
        <a
          href="https://twitter.com"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-green-600 my-2 rounded-30px"
        >
          Discord
        </a>
        <a
          href="https://twitter.com"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-green-600 my-2 rounded-30px"
        >
          Twitter
        </a>
      </div>

      {/* Buttons - Desktop */}
      <div className="hidden sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <a
          href="https://amigos-odyssey-click.vercel.app/"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-green-600 transform transition-transform duration-300 rounded-30px"
        >
          AO CLICK
        </a>
        <a
          href="https://twitter.com/amigosodyssey"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-green-600 transform transition-transform duration-300 rounded-30px"
        >
          TWITTER
        </a>
        <a
          href="https://discord.com/invite/xjVx6AekJs"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-green-600 transform transition-transform duration-300 rounded-30px"
        >
          DISCORD
        </a>
      </div>

      {/* Responsive Hamburger Icon */}
      <button
  className="sm:hidden block text-black font-bold focus:outline-none"
  onClick={toggleMenu}
>
  {menuOpen ? 'Close' : 'Menu'}
</button>

      {/* Wallet and Connect Button */}
      <div
        className={`${
          connected ? 'rounded-md bg-green-100 p-4' : 'rounded-md bg-purple-100 p-4'
        }`}
      >
        {connected ? (
          <Wallet />
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <ConnectButton />
          </Suspense>
        )}
      </div>
    </header>
  );
};

export default Header;
