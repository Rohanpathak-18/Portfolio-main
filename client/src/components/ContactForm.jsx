import { useState } from 'react';
import { UserRound } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '2f3beee9-a805-462e-84b4-1d592a179f42');
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
        message:
          error instanceof TypeError
            ? 'Could not reach the form service. Check your connection and try again.'
            : error.message || 'Unable to send your message. Please try again.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span className="form-label-with-mark">
            <UserRound className="form-label-mark" aria-hidden="true" /> Your name
          </span>
          <input
            name="name"
            autoComplete="name"
            placeholder="What's your name, buddy?"
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
            placeholder="youremail@gmail.com"
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
