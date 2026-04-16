# Desplegar en Netlify

Este proyecto está optimizado para despliegue en **Netlify** usando **Netlify Functions** para el backend serverless.

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todo esté en git
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Conectar a Netlify

**Opción A: Dashboard Netlify (Recomendado)**
1. Ve a https://app.netlify.com
2. Click en "New site from Git"
3. Selecciona GitHub y autoriza
4. Elige el repositorio "lista-de-tareas"
5. Configura:
   - **Build command**: `npm run build` (o dejar en blanco)
   - **Publish directory**: `public`
   - **Functions directory**: `netlify/functions`

**Opción B: Netlify CLI**

```bash
npm install -g netlify-cli
netlify auth login
netlify deploy --prod
```

### 3. Configurar Variables de Entorno

En el Dashboard de Netlify:
1. Ve a **Site settings** → **Environment variables**
2. Agregar:
   ```
   SUPABASE_URL = https://tu-proyecto.supabase.co
   SUPABASE_KEY = tu_api_key_publico_aqui
   NODE_ENV = production
   ```

⚠️ **IMPORTANTE**: Nunca hagas commit del `.env` con valores reales. Netlify lo maneja automáticamente.

### 4. Verificar el Despliegue

Después de hacer push a GitHub:
1. Netlify se dispara automáticamente
2. Ve a **Deployments** en el dashboard
3. Espera a que termine el build
4. ¡Tu sitio estará en vivo!

## 📋 Estructura del Proyecto

```
Lista de tareas/
├── netlify/
│   └── functions/              # Funciones serverless
│       ├── tareas.js           # Endpoints CRUD
│       └── health.js           # Health check
├── public/                     # Archivos estáticos
│   ├── index.html
│   ├── css/
│   └── js/
│       └── app.js             # ✅ Ya actualizado para Netlify
├── src/                        # Código backend (local)
├── netlify.toml               # Configuración Netlify
└── package.json
```

## 🔄 Cómo Funciona

1. **Frontend**: Los archivos en `public/` se sirven como estáticos
2. **Backend**: Las funciones en `netlify/functions/` actúan como APIs serverless
3. **Rutas**:
   - `/api/tareas` → `/.netlify/functions/tareas`
   - `/api/health` → `/.netlify/functions/health`
4. **CORS**: Configurado automáticamente en `netlify.toml`

## 🧪 Probar Localmente

```bash
npm install -g netlify-cli

# Ejecuta con simulación de Netlify Functions
netlify dev

# O usa el servidor Express normal (sin functions)
npm run dev
```

## 🔒 Seguridad

✅ Variables de entorno en Netlify (no en git)  
✅ CORS configurado en `netlify.toml`  
✅ Headers de seguridad incluidos  
✅ `.env` en `.gitignore`  

## 📊 Limites de Netlify

- **Ejecución máxima**: 10 segundos por función
- **Tamaño máximo**: 50MB
- **Llamadas**: Plan gratuito tiene límites

Para más información: https://docs.netlify.com/functions/overview/

## 🚨 Problemas Comunes

### "Variables de entorno no encontradas"
→ Configura SUPABASE_URL y SUPABASE_KEY en Site settings → Environment variables

### "Función no se encuentra"
→ Asegúrate de que `netlify/functions/` está en git
→ Reconstruye: `netlify deploy --prod --functions=netlify/functions`

### "CORS error"
→ Ya está configurado en `netlify.toml`
→ Si persiste, verifica que SUPABASE_KEY es la pública (no service role)

## ✅ Checklist Predespliegue

- [ ] Git repository creado y conectado
- [ ] SUPABASE_URL y SUPABASE_KEY configurados en Netlify
- [ ] Tabla `tareas` creada en Supabase
- [ ] `netlify.toml` está presente
- [ ] `netlify/functions/` tiene los archivos
- [ ] `package.json` en la raíz
- [ ] `public/` tiene los archivos estáticos

## 📞 URLs en Producción

- **Frontend**: `https://tu-sitio.netlify.app`
- **API Health**: `https://tu-sitio.netlify.app/.netlify/functions/health`
- **API Tareas**: `https://tu-sitio.netlify.app/api/tareas`

¡Listo! Tu aplicación está desplegada en Netlify. 🎉
