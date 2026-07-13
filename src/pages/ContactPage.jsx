import { contactMethods, faqs, site } from '../data/site.js';
import { EnquiryForm } from '../components/EnquiryForm.jsx';
import { FaqAccordion } from '../components/FaqAccordion.jsx';

export function ContactPage() {
  return (
    <>
      <section className="page-hero compact">
        <span className="eyebrow">Contact</span>
        <h1>Student Accommodation Support</h1>
        <p>
          Whether you are enquiring about a room or need accommodation information, our team is here
          to help.
        </p>
      </section>

      <div className="contact-page-flow">
        <section className="section contact-layout">
          <aside className="contact-card">
            <h2>Get in Touch</h2>
            {contactMethods.map(([label, value, Icon]) => (
              <div className="contact-method" key={label}>
                <Icon size={22} />
                <div>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </aside>
          <section className="form-card">
            <h2>Send an Enquiry</h2>
            <p>Fill out the form and the Pendula team will respond with availability and next steps.</p>
            <EnquiryForm />
          </section>
        </section>

        <section className="section faq-section">
          <div className="section-heading centered">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={faqs} />
        </section>
      </div>

      <section className="map-block">
        <div>
          <strong>{site.name} Student Accommodation</strong>
          <span>{site.address}</span>
        </div>
      </section>
    </>
  );
}
