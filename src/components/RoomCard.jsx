import { Link } from 'react-router-dom';
import { Info, Radar } from 'lucide-react';

export function RoomCard({ room, reversed = false }) {
  return (
    <article className={`room-card ${reversed ? 'room-card-reversed' : ''}`}>
      <div className="room-image-wrap">
        <img src={room.image} alt={`${room.name} accommodation`} />
        <span className="tag">{room.tag}</span>
      </div>
      <div className="room-content">
        <div className="room-heading">
          <div>
            <span className="eyebrow">Room Type</span>
            <h2>{room.name}</h2>
          </div>
          <span className="room-price">{room.price}</span>
        </div>
        <p>{room.description}</p>
        <h3>Includes</h3>
        <ul className="feature-grid">
          {room.includes.map(([label, Icon]) => (
            <li key={label}>
              <Icon size={18} />
              {label}
            </li>
          ))}
        </ul>
        <div className="button-row">
          <Link className="pill-button" to="/contact#enquiry">
            Enquire Now
          </Link>
          <Link className="outline-button" to="/tour">
            <Radar size={17} />
            View Space
          </Link>
          <Link className="text-link" to="/contact#enquiry">
            <Info size={16} />
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
