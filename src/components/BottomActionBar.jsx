import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

export function BottomActionBar() {
  return (
    <div className="bottom-action-bar" aria-label="Quick actions">
      <Link to="/contact">
        <MessageSquare size={18} />
        Enquire
      </Link>
      <Link className="primary" to="/contact">
        <Calendar size={18} />
        Request Viewing
      </Link>
    </div>
  );
}
