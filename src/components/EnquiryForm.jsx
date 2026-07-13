import { useState } from 'react';
import { Send } from 'lucide-react';
import { rooms } from '../data/site.js';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  roomType: rooms[0].name,
  moveInDate: '',
  message: '',
  consent: false
};

export function EnquiryForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending enquiry...' });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send enquiry.');
      }

      setForm(initialState);
      setStatus({ type: 'success', message: 'Your enquiry has been sent.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submitForm}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={updateField} required />
        </label>
        <label>
          Email Address
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Phone Number
          <input name="phone" value={form.phone} onChange={updateField} required />
        </label>
        <label>
          Academic Institution
          <input name="institution" value={form.institution} onChange={updateField} />
        </label>
        <label>
          Room Type
          <select name="roomType" value={form.roomType} onChange={updateField}>
            {rooms.map((room) => (
              <option key={room.name}>{room.name}</option>
            ))}
          </select>
        </label>
        <label>
          Intended Move-In Date
          <input name="moveInDate" type="date" value={form.moveInDate} onChange={updateField} />
        </label>
      </div>
      <label>
        Your Message
        <textarea
          name="message"
          value={form.message}
          onChange={updateField}
          rows="5"
          placeholder="Tell us about your requirements or questions."
          required
        />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required />
        I agree to be contacted about my enquiry.
      </label>
      <button className="pill-button form-submit" type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending...' : 'Send Enquiry'}
        <Send size={18} />
      </button>
      {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
    </form>
  );
}
