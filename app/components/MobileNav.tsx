'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav" aria-label="Primary">
      <button
        className="nav__burger"
        id="burger"
        aria-expanded={isOpen}
        aria-controls="navlist"
        onClick={toggleMenu}
        type="button"
      >
        <span />
        <span />
        <span />
        <span className="sr">Menu</span>
      </button>
      <ul className={`nav__list ${isOpen ? 'open' : ''}`} id="navlist">
        <li className="nav__item">
          <Link href="#how" onClick={closeMenu}>How It Works</Link>
        </li>
        <li className="nav__item">
          <Link href="#demo" onClick={closeMenu}>See It Read</Link>
        </li>
        <li className="nav__item">
          <Link href="#features" onClick={closeMenu}>Features</Link>
        </li>
        <li className="nav__item">
          <Link href="#delivery" onClick={closeMenu}>Delivery</Link>
        </li>
        <li className="nav__item">
          <Link href="#voices" onClick={closeMenu}>Readers</Link>
        </li>
      </ul>
    </nav>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
