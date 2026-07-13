import { rooms } from '../data/site.js';
import { RoomCard } from '../components/RoomCard.jsx';

export function RoomsPage() {
  return (
    <>
      <section className="page-hero compact">
        <span className="eyebrow">Our Rooms</span>
        <h1>Comfortable Living Spaces</h1>
        <p>Choose from accommodation options that suit your needs and budget.</p>
      </section>
      <section className="section rooms-page-list">
        {rooms.map((room, index) => (
          <RoomCard key={room.name} room={room} reversed={index % 2 === 1} />
        ))}
      </section>
    </>
  );
}
