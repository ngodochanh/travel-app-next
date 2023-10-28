'use client';

import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { useEffect, useState } from 'react';

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const throttle = <T extends any[]>(func: (...args: T) => void, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: T) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const handleResize = throttle(() => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (width >= 1024) {
      setNavbar(false);
    }
  }, 100); // Thời gian chờ giữa các lần gọi

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Loại bỏ sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>
      <ul className={`gap-12 lg:flex ${navbar ? 'nav-phone' : 'hidden'}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`regular-16 text-gray-50 flexCenter cursor-pointer hover:font-bold ${
              navbar && 'hover:bg-green-50 py-2 hover:text-white'
            } `}
            onClick={() => setNavbar(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="lg:flexCenter">
          <Button
            type="button"
            title="Login"
            icon="user.svg"
            variant={navbar ? 'btn_dark_green_navbar' : 'btn_dark_green'}
          />
        </div>
      </ul>

      <div className="inline-block cursor-pointer lg:hidden" onClick={() => setNavbar(!navbar)}>
        {navbar ? (
          <Image src="close.svg" alt="menu" width={32} height={32} />
        ) : (
          <Image src="menu.svg" alt="menu" width={32} height={32} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
