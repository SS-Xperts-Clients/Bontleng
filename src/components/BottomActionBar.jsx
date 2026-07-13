import { Calendar, MessageSquare } from 'lucide-react';

export function BottomActionBar() {
  return (
    <div className="bottom-action-bar" aria-label="Quick actions">
      <a href="/contact">
        <MessageSquare size={18} />
        Enquire
      </a>
      <a className="primary" href="/contact">
        <Calendar size={18} />
        Request Viewing
      </a>
    </div>
  );
}
