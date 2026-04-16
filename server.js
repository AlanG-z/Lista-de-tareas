require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const tareasRouter = require('./src/api/tareas');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// Ruta raíz - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas API
app.use('/api/tareas', tareasRouter);

// Manejo de errores
app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Servidor en http://localhost:${port}`);
    console.log(`📝 Entorno: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health Check: http://localhost:${port}/api/health`);
});