const express = require('express');
const app = express();
const logger = require('./middlewares/logger');

app.use(logger);

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});