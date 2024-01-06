import { ContactForm } from "./contactForm";
import { ContactInfos } from "./contactInfos";
export const ContactBody = () => {
  return (
    <div className="contact-body">
      <div className="contact-left">
        <ContactForm />
      </div>
      <div className="contact-left">
        <ContactInfos />
      </div>
    </div>
  );
};
