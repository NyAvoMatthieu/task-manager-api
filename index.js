const express = require('express');
const app = express();

const logger = require('./middlewares/logger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

// 🔐 Sécurité
app.use(helmet());

// 🧾 Logger
app.use(logger);

// 📦 Body parser
app.use(express.json());

// 🚦 Rate limiter (AVANT les routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

app.use(limiter);

// 📌 Routes
app.use('/api/tasks', taskRoutes);

// ❗ Gestion d'erreurs (TOUJOURS EN DERNIER)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});