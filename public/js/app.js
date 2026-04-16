// Variables globales
// Usar URL relativa para funcionar en desarrollo y producción
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

// Alertas 
function mostrarAlerta(mensaje, tipo = 'info', duracion = 3000) {
    const alertElement = document.getElementById('custom-alert');
    const messageElement = document.getElementById('alert-message');
    
    messageElement.textContent = mensaje;
    alertElement.className = `alert ${tipo}`;
    
    if (duracion > 0) {
        setTimeout(() => cerrarAlerta(), duracion);
    }
}

function cerrarAlerta() {
    const alertElement = document.getElementById('custom-alert');
    alertElement.classList.add('alert-hidden');
}

// Variables globales para modal
let tareaEnEdicion = null;
let elementoEnEdicion = null;

// Funciones del Modal
function abrirModalEditar(tarea, textoElement) {
    tareaEnEdicion = tarea;
    elementoEnEdicion = textoElement;
    
    const modal = document.getElementById('modal-editar');
    const input = document.getElementById('modal-input');
    
    input.value = tarea.texto;
    modal.classList.remove('modal-hidden');
    input.focus();
    input.select();
}

function cerrarModalEditar() {
    const modal = document.getElementById('modal-editar');
    modal.classList.add('modal-hidden');
    tareaEnEdicion = null;
    elementoEnEdicion = null;
}

async function guardarEdicion() {
    if (!tareaEnEdicion) return;
    
    const input = document.getElementById('modal-input');
    const nuevoTexto = input.value.trim();
    
    if (nuevoTexto === "") {
        mostrarAlerta('❌ La tarea no puede estar vacía', 'error', 3000);
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/tareas/${tareaEnEdicion.id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: nuevoTexto })
        });
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            elementoEnEdicion.textContent = nuevoTexto;
            tareaEnEdicion.texto = nuevoTexto;
            cerrarModalEditar();
            mostrarAlerta('✅ Tarea actualizada correctamente', 'success', 3000);
        } else {
            const error = await respuesta.json();
            mostrarAlerta(`❌ Error: ${error.error}`, 'error', 5000);
        }
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        mostrarAlerta('❌ Error al actualizar la tarea', 'error', 5000);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const tareaInput = document.getElementById('task-input');
    const agregarBtn = document.getElementById('add-task-btn');
    const tareaLista = document.getElementById('task-list');

    // Cargar tareas al iniciar
    cargarTareas();

    async function cargarTareas() {
        try {
            console.log('📡 Cargando tareas...');
            const respuesta = await fetch(`${API_URL}/tareas`, {
                headers: { 'Content-Type': 'application/json' }
            });
            


            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
            }
            
            const tareas = await respuesta.json();
            console.log('✅ Tareas cargadas:', tareas);
            
            tareaLista.innerHTML = '';
            if (tareas.length === 0) {
                tareaLista.innerHTML = '';
                mostrarAlerta('Base de datos conectada, sin tareas aún', 'info', 5000);
                return;
            } else {
                tareas.forEach(tarea => crearElementoTarea(tarea));
                mostrarAlerta(`✅ ${tareas.length} tarea(s) cargada(s)`, 'success', 3000);
            }
        } catch (error) {
            console.error('❌ Error al cargar tareas:', error);
            tareaLista.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`;
            mostrarAlerta('❌ Error: ' + error.message, 'error', 5000);
        }
    }

    async function addTask() {
        if (tareaInput.value.trim() === "") return;

        try {
            const respuesta = await fetch(`${API_URL}/tareas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tarea: tareaInput.value })
            });

            if (respuesta.ok) {
                const nuevaTarea = await respuesta.json();
                crearElementoTarea(nuevaTarea);
                tareaInput.value = "";
                tareaInput.focus();
                mostrarAlerta('✅ Tarea agregada exitosamente', 'success', 3000);
                cargarTareas();
            } else {
                const error = await respuesta.json();
                mostrarAlerta(`Error: ${error.error}`, 'error', 5000);
            }
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            mostrarAlerta('❌ Error al agregar la tarea', 'error', 5000);
        }
    }

    function crearElementoTarea(tarea) {
        const newElement = document.createElement("li");
        const textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;
        textoTarea.className = "tarea-texto";
        
        const botonesContainer = document.createElement("div");
        botonesContainer.className = "botones-container";
        
        const btnModificar = document.createElement("button");
        btnModificar.className = "modify-btn";
        btnModificar.textContent = "✏️ Editar";
        
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "delete-btn";
        btnEliminar.textContent = "🗑️ Eliminar";
        
        botonesContainer.appendChild(btnModificar);
        botonesContainer.appendChild(btnEliminar);
        
        newElement.appendChild(textoTarea);
        newElement.appendChild(botonesContainer);
        newElement.dataset.id = tarea.id;

        // Botón Eliminar
        btnEliminar.addEventListener("click", async (event) => {
            event.stopPropagation();
            if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
                try {
                    const respuesta = await fetch(`${API_URL}/tareas/${tarea.id}`, { 
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    
                    if (respuesta.ok) {
                        newElement.remove();
                        mostrarAlerta('✅ Tarea eliminada', 'success', 3000);
                        cargarTareas();
                    } else {
                        mostrarAlerta('❌ Error al eliminar la tarea', 'error', 5000);
                    }
                } catch (error) {
                    console.error('Error al eliminar tarea:', error);
                    mostrarAlerta('❌ Error al eliminar la tarea', 'error', 5000);
                }
            }
        });

        // Botón Modificar
        btnModificar.addEventListener("click", (event) => {
            event.stopPropagation();
            abrirModalEditar(tarea, textoTarea);
        });

        tareaLista.appendChild(newElement);
    }

    agregarBtn.addEventListener("click", addTask);
    tareaInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    // Cerrar modal con ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") cerrarModalEditar();
    });

    // Guardar cuando presione Enter en el input del modal
    const modalInput = document.getElementById('modal-input');
    modalInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") guardarEdicion();
    });

    // Cerrar modal cuando hagas clic fuera del contenido
    const modalOverlay = document.getElementById('modal-editar');
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            cerrarModalEditar();
        }
    });
});
