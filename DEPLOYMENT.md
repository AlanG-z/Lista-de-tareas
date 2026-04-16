# Guía de Despliegue a Producción

## 🚀 Opciones de Despliegue

### 1. **Netlify** ⭐ (RECOMENDADO - Ya Configurado)

El proyecto está **totalmente optimizado para Netlify** con Netlify Functions.

Ver: [NETLIFY.md](NETLIFY.md)

```bash
# Pasos rápidos:
1. Conecta tu GitHub en https://app.netlify.com
2. Configura SUPABASE_URL y SUPABASE_KEY en Environment Variables
3. Haz push a main - ¡Netlify deploy automático!
```

**Ventajas:**
✅ Despliegue automático en cada push  
✅ HTTPS gratis  
✅ Funciones serverless sin servidor  
✅ Plan gratuito generoso  
✅ Previsualización de PRs  

---

### 2. **Heroku** (Alternativa - Requiere Refactorización)

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login en Heroku
heroku login

# Crear app
heroku create tu-app-name

# Configurar variables de entorno
heroku config:set SUPABASE_URL=https://tu-proyecto.supabase.co
heroku config:set SUPABASE_KEY=tu_api_key_aqui
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Ver logs
heroku logs --tail
```

### 2. **Vercel** (Serverless)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar environment variables en el dashboard
```

### 3. **Railway** (Simple y rápido)

```bash
# Conectar repo en https://railway.app
# Agregar variables de entorno en el dashboard
# Deploy automático en push a main
```

### 4. **DigitalOcean App Platform**

1. Conectar repositorio GitHub
2. Agregar variables de entorno:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `NODE_ENV=production`
3. Deploy automático

### 5. **Docker + VPS (AWS, Azure, Google Cloud)**

```dockerfile
# Crear Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# Build
docker build -t lista-de-tareas .

# Run
docker run -e SUPABASE_URL=... -e SUPABASE_KEY=... -p 3000:3000 lista-de-tareas
```

## 🔐 Seguridad en Producción

- ✅ `node_modules` NO se incluye en git (definido en `.gitignore`)
- ✅ `.env` NO se sube a git (ignorado)
- ✅ Usar variables de entorno seguras en la plataforma de despliegue
- ✅ Usar HTTPS obligatoriamente
- ✅ Limitar CORS a dominio específico en producción
- ✅ Validar datos en el servidor

### Actualizar CORS para Producción

En `server.js`, cambiar:

```javascript
// Desarrollo
app.use(cors());

// Producción
app.use(cors({
  origin: 'https://tu-dominio.com',
  credentials: true,
  optionsSuccessStatus: 200
}));
```

## 📊 Monitoreo

- Heroku: Dashboard nativo
- Railway: Dashboard nativo
- VPS: Usar PM2 + Monitoring

```bash
# Con PM2
npm install -g pm2

pm2 start server.js --name "lista-tareas"
pm2 monit
pm2 save
pm2 startup
```

## 🔄 CI/CD (Opcional)

Crear `.github/workflows/deploy.yml` para despliegue automático en cada push a `main`.

## ✅ Checklist Preproducción

- [ ] `.env` configurado en la plataforma
- [ ] Base de datos creada en Supabase
- [ ] CORS configurado correctamente
- [ ] Pruebas en staging antes de main
- [ ] Backups configurados
- [ ] Logs monitoreados
- [ ] Certificado SSL/HTTPS
