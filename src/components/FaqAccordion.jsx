import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <section className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
            <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              {item.question}
              <ChevronDown size={20} />
            </button>
            {isOpen && <p>{item.answer}</p>}
          </section>
        );
      })}
    </div>
  );
}
