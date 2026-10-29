import ContactMessage from '../models/ContactMessage.js';

export async function createContactMessage(request, response, next) {
  try {
    const { name, email, subject = '', message } = request.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return response
        .status(400)
        .json({ message: 'Name, email, and message are required.' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return response.status(400).json({ message: 'Enter a valid email address.' });
    }

    await ContactMessage.create({ name, email, subject, message });
    return response.status(201).json({ message: 'Your message has been received.' });
  } catch (error) {
    next(error);
  }
}
