# Lista de Tareas - Aplicación Full Stack

Una aplicación moderna de lista de tareas construida con **Node.js**, **Express** y **Supabase**.

**🚀 Optimizada para despliegue en Netlify con Netlify Functions**

## 📁 Estructura del Proyecto

```
Lista de tareas/
├── netlify/
│   └── functions/                # ⭐ Funciones serverless para Netlify
│       ├── tareas.js             # API endpoints
│       └── health.js             # Health check
├── src/                          # Código backend local (desarrollo)
│   ├── api/
│   │   └── tareas.js
│   ├── config/
│   │   └── supabase.js
│   └── middleware/
│       ├── errorHandler.js
│       └── logger.js
├── public/                       # Archivos estáticos del frontend
│   ├── index.html                # Página principal
│   ├── css/
│   │   ├── styles.css
│   │   └── alerts.css
│   └── js/
│       └── app.js                # ✅ Actualizado para Netlify
├── netlify.toml                  # 🔧 Configuración Netlify
├── server.js                     # Servidor Express (desarrollo)
├── package.json
└── .env.example
```

## 🚀 Despliegue Rápido en Netlify

1. **Conecta tu GitHub a Netlify:**
   - Ve a https://app.netlify.com y haz login
   - Click en "New site from Git"
   - Selecciona este repositorio

2. **Configura variables de entorno en Netlify:**
   - Site settings → Environment variables
   - Agrega:
     ```
     SUPABASE_URL=https://tu-proyecto.supabase.co
     SUPABASE_KEY=tu_api_key_aqui
     ```

3. **¡Listo!** Netlify desplegará automáticamente en cada push a `main`

📖 Ver [NETLIFY.md](NETLIFY.md) para instrucciones detalladas.

---

## 🛠️ Desarrollo Local

### Instalación

1. **Clonar o descargar el proyecto:**
```bash
cd "Lista de tareas"
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edita el archivo `.env` con tus credenciales de Supabase:
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_KEY=tu_api_key_aqui
   PORT=3000
   NODE_ENV=development
   ```

4. **Crear tabla en Supabase:**
   - Ve a SQL Editor en Supabase y ejecuta:
   ```sql
   create table tareas (
     id bigint primary key generated always as identity,
     texto text not null,
     completada boolean default false,
     created_at timestamp default now()
   );
   ```

## 🏃 Ejecutar la Aplicación

**Modo desarrollo (con recarga automática):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

Luego abre `http://localhost:3000` en tu navegador.

## 🎯 Funcionalidades

✅ Crear tareas  
✅ Ver todas las tareas  
✅ Eliminar tareas (con confirmación)  
✅ Marcar tareas como completadas  
✅ Sincronización en tiempo real con Supabase  
✅ Acceso desde cualquier dispositivo  

## 📚 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tareas` | Obtener todas las tareas |
| POST | `/api/tareas` | Crear una nueva tarea |
| DELETE | `/api/tareas/:id` | Eliminar una tarea |
| PUT | `/api/tareas/:id` | Actualizar tarea |

### Ejemplos de peticiones:

**GET - Obtener tareas:**
```bash
curl http://localhost:3000/api/tareas
```

**POST - Crear tarea:**
```bash
curl -X POST http://localhost:3000/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"tarea":"Mi nueva tarea"}'
```

**DELETE - Eliminar tarea:**
```bash
curl -X DELETE http://localhost:3000/api/tareas/1
```

## 🎨 Diseño

La interfaz utiliza:
- **Gradiente moderno** en púrpura
- **Animaciones suaves** al interactuar
- **Diseño responsivo** (funciona en mobile)
- **Estilos limpios y minimalistas**

## 🔒 Seguridad

⚠️ **Importante:**
- El archivo `.env` está en `.gitignore` y no debe compartirse
- Las credenciales de Supabase están protegidas
- Nunca commits `.env` a git

## 🛠️ Tecnologías

- **Backend:** Node.js, Express.js
- **Base de datos:** Supabase (PostgreSQL)
- **Frontend:** HTML, CSS, JavaScript vanilla
- **Middleware:** CORS, dotenv

## 📝 Notas de desarrollo

- El código backend está modularizado en `src/` para mejor mantenibilidad
- Los archivos frontend (HTML, CSS, JS) están en `public/`
- Los errores se manejan centralizadamente con `errorHandler.js`
- Las rutas API están separadas en `src/api/tareas.js`
- Variables de entorno en `.env` (usa `.env.example` como referencia)

## 🐛 Troubleshooting

**Error: "Cannot find module 'dotenv'"**
```bash
npm install dotenv
```

**Error: Variables de Supabase no configuradas**
- Verifica que el archivo `.env` exista
- Asegúrate de tener `SUPABASE_URL` y `SUPABASE_KEY` correctos

**El servidor no inicia**
- Verifica que el puerto 3000 esté disponible
- Intenta cambiar el puerto en `.env`

## 📄 Licencia

MIT

---

Creado con ❤️ para mejorar tu productividad
