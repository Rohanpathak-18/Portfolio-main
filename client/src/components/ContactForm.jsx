import { useState } from 'react';
import { sendContactMessage } from '../services/api';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setStatus('');
    try {
      await sendContactMessage(payload);
      form.reset();
      setStatus('Thanks — your note is on its way.');
    } catch {
      setStatus('The message service is not connected yet. Please email me directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            required
            maxLength="80"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@email.com"
            required
            maxLength="160"
          />
        </label>
      </div>
      <label>
        What would you like to build?
        <textarea
          name="message"
          placeholder="A little about your project..."
          required
          rows="3"
          maxLength="2000"
        />
      </label>
      <div className="form-bottom">
        <button className="button button-red" disabled={sending}>
          {sending ? 'Sending...' : 'Send a message'} <span>&gt;</span>
        </button>
        <span className="form-status" aria-live="polite">
          {status}
        </span>
      </div>
    </form>
  );
}
