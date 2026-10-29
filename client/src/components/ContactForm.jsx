import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', 'cde0b91b-b2f2-4d30-b777-a9683d974869');
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to send your message. Please try again.',
        );
      }

      form.reset();
      setStatus({ type: 'success', message: 'Thank you for your submission.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your message. Please try again.',
      });
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
        <span
          className={`form-status ${status.type ? `form-status-${status.type}` : ''}`}
          aria-live={status.type === 'error' ? 'assertive' : 'polite'}
        >
          {status.message}
        </span>
      </div>
    </form>
  );
}
