# Inicio Rápido

## 🚀 En 3 Pasos

### 1️⃣ Configurar Ambiente
```bash
npm install
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

### 2️⃣ Ejecutar Localmente
```bash
npm run dev
# Abierto en http://localhost:3000
```

### 3️⃣ Subir a Producción
Ver [DEPLOYMENT.md](DEPLOYMENT.md) para opciones de hosting.

---

## 📚 Documentación

- **[README.md](README.md)** - Documentación completa
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía de despliegue
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir
- **[SECURITY.md](SECURITY.md)** - Política de seguridad

---

## 🆘 Problemas Comunes

### Error: "Las variables de entorno no están configuradas"
```bash
cp .env.example .env
# Editar .env con valores reales
```

### Puerto 3000 ya en uso
```bash
PORT=3001 npm run dev
```

### node_modules corrupto
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Soporte

- Abre un Issue en GitHub
- Consulta [SECURITY.md](SECURITY.md) para vulnerabilidades
