import { Link } from 'react-router-dom';
import { Mail, Phone, Share2 } from 'lucide-react';
import { site } from '../data/site.js';

export function AppFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h2>{site.name}</h2>
          <p>
            Student accommodation designed for study, safety, community, and everyday convenience.
          </p>
        </section>
        <section>
          <h3>Explore</h3>
          <Link to="/rooms">Rooms</Link>
          <a href="/#amenities">Amenities</a>
          <Link to="/tour">Space Preview</Link>
        </section>
        <section>
          <h3>Support</h3>
          <Link to="/contact">Contact</Link>
          <Link to="/contact">FAQs</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </section>
        <section>
          <h3>Contact</h3>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>
            <Phone size={16} />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={16} />
            {site.email}
          </a>
        </section>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pendula Student Accommodation. All rights reserved.</span>
        <button className="icon-button footer-share" aria-label="Share website">
          <Share2 size={18} />
        </button>
      </div>
    </footer>
  );
}
