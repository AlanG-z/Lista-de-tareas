const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);
    console.error('Stack:', err.stack);

    // Errores de Supabase
    if (err.message && err.message.includes('not found')) {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Errores de conexión
    if (err.message && (err.message.includes('ECONNREFUSED') || err.message.includes('fetch'))) {
        return res.status(503).json({ error: 'Servidor no disponible. Verifica Supabase.' });
    }

    // Error genérico
    res.status(err.statusCode || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Error en el servidor' 
            : err.message || 'Error desconocido'
    });
};

module.exports = errorHandler;
