const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variables de entorno SUPABASE_URL y SUPABASE_KEY requeridas');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Headers CORS
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
};

// Manejar preflight requests
exports.handler = async (event, context) => {
    try {
        // CORS preflight
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: ''
            };
        }

        const method = event.httpMethod;
        const path = event.path.split('/').pop();
        const id = parseInt(path);

        // GET /api/tareas - obtener todas las tareas
        if (method === 'GET' && !id) {
            const { data, error } = await supabase
                .from('tareas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data || [])
            };
        }

        // POST /api/tareas - agregar una tarea
        if (method === 'POST' && !id) {
            const { tarea } = JSON.parse(event.body || '{}');

            if (!tarea || tarea.trim() === '') {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'La tarea no puede estar vacía' })
                };
            }

            const { data, error } = await supabase
                .from('tareas')
                .insert([{
                    texto: tarea.trim(),
                    completada: false
                }])
                .select();

            if (error) throw error;

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify(data[0])
            };
        }

        // DELETE /api/tareas/:id - eliminar una tarea
        if (method === 'DELETE' && id) {
            if (isNaN(id)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'ID inválido' })
                };
            }

            const { error } = await supabase
                .from('tareas')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ mensaje: 'Tarea eliminada', id })
            };
        }

        // PUT /api/tareas/:id - actualizar una tarea
        if (method === 'PUT' && id) {
            if (isNaN(id)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'ID inválido' })
                };
            }

            const body = JSON.parse(event.body || '{}');
            const { completada, texto } = body;

            const updateData = {};

            if (completada !== undefined) {
                if (typeof completada !== 'boolean') {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'El campo completada debe ser boolean' })
                    };
                }
                updateData.completada = completada;
            }

            if (texto !== undefined) {
                if (typeof texto !== 'string' || texto.trim() === '') {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'El texto no puede estar vacío' })
                    };
                }
                updateData.texto = texto.trim();
            }

            if (Object.keys(updateData).length === 0) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Debe proporcionar al menos un campo para actualizar' })
                };
            }

            const { data, error } = await supabase
                .from('tareas')
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) throw error;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data[0])
            };
        }

        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Ruta no encontrada' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Error interno del servidor'
            })
        };
    }
};
