const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET - obtener todas las tareas
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('tareas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        next(error);
    }
});

// POST - agregar una tarea
router.post('/', async (req, res, next) => {
    try {
        const { tarea } = req.body;

        if (!tarea || tarea.trim() === '') {
            return res.status(400).json({ error: 'La tarea no puede estar vacía' });
        }

        const { data, error } = await supabase
            .from('tareas')
            .insert([{ 
                texto: tarea.trim(), 
                completada: false
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        next(error);
    }
});

// DELETE - eliminar una tarea
router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const { error } = await supabase
            .from('tareas')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ mensaje: 'Tarea eliminada', id });
    } catch (error) {
        next(error);
    }
});

// PUT - actualizar tarea (texto o completada)
router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { completada, texto } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        // Preparar datos a actualizar
        const updateData = {};
        
        if (completada !== undefined) {
            if (typeof completada !== 'boolean') {
                return res.status(400).json({ error: 'El campo completada debe ser boolean' });
            }
            updateData.completada = completada;
        }
        
        if (texto !== undefined) {
            if (typeof texto !== 'string' || texto.trim() === '') {
                return res.status(400).json({ error: 'El texto no puede estar vacío' });
            }
            updateData.texto = texto.trim();
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const { data, error } = await supabase
            .from('tareas')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
