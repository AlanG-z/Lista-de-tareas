exports.handler = async (event, context) => {
    try {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                status: 'OK',
                message: 'Servidor funcionando en Netlify',
                environment: process.env.NODE_ENV || 'production'
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
