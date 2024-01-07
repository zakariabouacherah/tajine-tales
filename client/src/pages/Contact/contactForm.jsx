import contact from "../../../public/contact-illustration.svg"
export const ContactForm = () => {
  return (
    <div className="contact-form">
      <p>
        Your thoughts and inquiries are the spice that adds flavor to our
        culinary community. Whether you're seeking recipe tips, have a
        collaboration proposal, or simply want to say hello, we're eager to hear
        from you. Let's keep the conversation going!
      </p>
      <div className="contact-img-con">
        <img src={contact} alt="contact" />
      </div>
      <form>
        <div className="input-wrapper">
          <input
            autocomplete="off"
            className="input"
            type="text"
            id="name"
            placeholder="Name"
          />
          <label className="label" for="name">
            Name
          </label>
        </div>
        <div className="input-wrapper">
          <input
            autocomplete="off"
            className="input"
            type="email"
            id="email"
            placeholder="Email"
          />
          <label className="label" for="email">
            Email
          </label>
        </div>
        <div className="input-wrapper">
          <textarea
            autocomplete="off"
            className="input"
            id="message"
            placeholder="Message"
            rows={4}
          />
          <label className="label" for="message">
            Message
          </label>
        </div>
        <button className="contact-submit">Submit</button>
      </form>
    </div>
  );
};
