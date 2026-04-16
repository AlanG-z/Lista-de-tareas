# Política de Seguridad

## 🔒 Reportar Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, **NO** abras un issue público.

En su lugar, envía un email a tu dirección de contacto con:
- Descripción de la vulnerabilidad
- Pasos para reproducirla
- Posible impacto

Recibirás una respuesta en máximo 48 horas.

## 🛡️ Prácticas de Seguridad

Este proyecto sigue las mejores prácticas de seguridad:

### Variables de Entorno
- Las credenciales NUNCA se comitean
- `.env` está en `.gitignore`
- Usar `.env.example` sin valores reales

### Dependencias
- Ejecutar regularmente `npm audit`
- Mantener dependencias actualizadas
- Revisar cambios en `package-lock.json`

### Código
- Validar entrada del usuario
- Escapar datos en SQL queries
- Usar HTTPS en producción
- CORS configurado restrictivamente

### Supabase
- Usar API Keys públicas correctamente
- Service Role Key solo en backend
- Configurar Row Level Security (RLS)

## 📦 Dependencias de Confianza

Este proyecto depende de:
- `express` - Framework web confiable
- `@supabase/supabase-js` - Cliente oficial Supabase
- `dotenv` - Manejo seguro de variables
- `cors` - Manejo de CORS

Todas verificadas regularmente.

## ✅ Checklist Seguridad

- [ ] `.env` configurado pero no commitado
- [ ] API Keys restringidas en Supabase
- [ ] CORS limitado a dominio específico
- [ ] HTTPS activado en producción
- [ ] Validación de datos en servidor
- [ ] Node.js versión reciente
- [ ] Dependencies sin vulnerabilidades conocidas
