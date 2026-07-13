import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { site } from '../data/site.js';

const navItems = [
  ['Rooms', '/rooms'],
  ['Amenities', '/#amenities'],
  ['Space Preview', '/tour'],
  ['Contact', '/contact']
];

export function AppHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Pendula home">
        <img src="/pendula_logo.png" alt="" />
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
      <Link className="pill-button header-cta" to="/contact">
        Check Availability
      </Link>
      <button className="icon-button mobile-menu" aria-label="Open menu">
        <Menu size={22} />
      </button>
    </header>
  );
}
