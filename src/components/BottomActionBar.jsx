import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

export function BottomActionBar() {
  return (
    <div className="bottom-action-bar" aria-label="Quick actions">
      <Link to="/contact#enquiry">
        <MessageSquare size={18} />
        Enquire
      </Link>
      <Link className="primary" to="/contact#enquiry">
        <Calendar size={18} />
        Request Viewing
      </Link>
    </div>
  );
}
