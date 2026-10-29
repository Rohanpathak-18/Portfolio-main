import cors from 'cors';
import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use((error, _request, response, _next) => {
  console.error(error);
  response
    .status(error.status || 500)
    .json({ message: error.message || 'Server error.' });
});

export default app;
