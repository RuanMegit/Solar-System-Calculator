import pfp from "./assets/pfp.jpeg";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">
      <header className="contact-header">
        <h1>Contact</h1>
        <p>Get in touch regarding solar projects, collaboration, or code.</p>
      </header>

      <section className="contact-card" aria-label="Contact details">
        <div className="contact-profile">
          <img
            src={pfp}
            alt="Portrait of Ruan Megit"
            className="contact-avatar"
          />
          <div className="contact-identity">
            <h2>Ruan Megit</h2>
            <p>Direct contact channels and profiles</p>
          </div>
        </div>

        <dl className="contact-list">
          <div className="contact-item">
            <dt>Phone</dt>
            <dd>
              <a href="tel:+27660926328">+27 66 092 6328</a>
            </dd>
          </div>

          <div className="contact-item">
            <dt>Email</dt>
            <dd>
              <a href="mailto:ruanmegit123@gmail.com">ruanmegit123@gmail.com</a>
            </dd>
          </div>

          <div className="contact-item">
            <dt>LinkedIn</dt>
            <dd>
              <a
                href="https://www.linkedin.com/in/ruan-megit-385256349/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/ruan-megit-385256349
              </a>
            </dd>
          </div>

          <div className="contact-item">
            <dt>GitHub</dt>
            <dd>
              <a
                href="https://github.com/RuanMegit"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/RuanMegit
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

export default Contact;
