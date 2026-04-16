# Contribuir al Proyecto

¡Gracias por tu interés en contribuir a **Lista de Tareas**!

## 📋 Pasos para Contribuir

### 1. Fork el Repositorio
Haz clic en "Fork" en la esquina superior derecha de GitHub.

### 2. Clona tu Fork
```bash
git clone https://github.com/tu-usuario/lista-de-tareas.git
cd lista-de-tareas
```

### 3. Crea una Rama de Características
```bash
git checkout -b feature/tu-caracteristica
# O para bugfix
git checkout -b fix/tu-bugfix
```

### 4. Configura el Entorno Local
```bash
npm install
cp .env.example .env
# Edita .env con tus credenciales de Supabase
```

### 5. Haz tus Cambios
- Mantén el código limpio y bien comentado
- Sigue la estructura del proyecto
- Prueba localmente con `npm run dev`

### 6. Commit con Mensajes Claros
```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

**Formatos de commits recomendados:**
- `feat:` Nuevas características
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (espacios, punto y coma)
- `refactor:` Refactorización sin cambios funcionales
- `perf:` Mejoras de rendimiento
- `test:` Agregar o actualizar pruebas

### 7. Push a tu Fork
```bash
git push origin feature/tu-caracteristica
```

### 8. Crea un Pull Request
- Ve a tu fork en GitHub
- Haz clic en "Compare & pull request"
- Describe tu cambio claramente
- Espera feedback

## 🎯 Guías de Estilo

### JavaScript
- Usa `const` por defecto, `let` si es necesario
- Nombres descriptivos para variables y funciones
- Comenta funciones complejas
- Indentación de 2 espacios

### Ejemplo:
```javascript
// ✅ Bueno
const obtenerTareas = async () => {
  const respuesta = await supabase
    .from('tareas')
    .select('*');
  return respuesta.data;
};

// ❌ Evitar
const gt = async () => {
  let r = await s.from('t').select('*');
  return r.data;
};
```

## 🐛 Reportar Bugs

Abre un Issue en GitHub con:
- Título descriptivo
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si es necesario
- Tu entorno (Node version, OS)

## ✨ Sugerencias

Abre una Discusión o Issue con label "enhancement" para:
- Nuevas características
- Mejoras en UX
- Optimizaciones

## 📝 Antes de Hacer PR

- [ ] Código funciona localmente
- [ ] No hay console.log() de debug
- [ ] `.env` no se commitea
- [ ] Tests pasan (si aplica)
- [ ] Documentación actualizada si hay cambios en API

## 🙏 Agradecimientos

Todos los contribuidores son bienvenidos. Gracias por mejorar este proyecto.
