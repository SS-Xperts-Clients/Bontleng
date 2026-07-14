import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../data/site.js';

const navItems = [
  ['Rooms', '/rooms'],
  ['Amenities', '/#amenities'],
  ['Space Preview', '/tour'],
  ['Contact', '/contact']
];

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Bontleng home" onClick={closeMenu}>
        <img src="/bontleng_student_accommodation_refined_logo.png" alt="" />
        <span>{site.name}</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) =>
          href.startsWith('/#') ? (
            <a key={href} href={href}>
              {label}
            </a>
          ) : (
            <NavLink key={href} to={href}>
              {label}
            </NavLink>
          )
        )}
      </nav>
      <Link className="pill-button header-cta" to="/contact" onClick={closeMenu}>
        Check Availability
      </Link>
      <button
        className="icon-button mobile-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {navItems.map(([label, href]) =>
          href.startsWith('/#') ? (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ) : (
            <NavLink key={href} to={href} onClick={closeMenu}>
              {label}
            </NavLink>
          )
        )}
      </nav>
    </header>
  );
}
