/**
 * Servidor de desarrollo simple para el template UBITS
 * Sirve archivos estáticos y maneja rutas
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para archivos estáticos
app.use(express.static('.'));

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para páginas específicas
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const validPages = [
    'dashboard',
    'aprendizaje', 
    'diagnostico',
    'desempeno',
    'encuestas',
    'reclutamiento',
    'tareas',
    'ubits-ai'
  ];
  
  if (validPages.includes(page)) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).send('Página no encontrada');
  }
});

// Ruta para API de Font Awesome (proxy)
app.get('/api/fontawesome/*', (req, res) => {
  // Proxy para API de Font Awesome
  res.json({ message: 'Font Awesome API proxy' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor UBITS iniciado');
  console.log(`📱 URL: http://localhost:${PORT}`);
  console.log('🎯 Template robusto con tecnologías modernas');
  console.log('🔧 Font Awesome API integrado');
  console.log('📱 Sistema responsive activo');
  console.log('🌙 Modo claro/oscuro disponible');
  console.log('');
  console.log('📋 Páginas disponibles:');
  console.log('  - / (Dashboard)');
  console.log('  - /aprendizaje');
  console.log('  - /diagnostico');
  console.log('  - /desempeno');
  console.log('  - /encuestas');
  console.log('  - /reclutamiento');
  console.log('  - /tareas');
  console.log('  - /ubits-ai');
  console.log('');
  console.log('🔧 Presiona Ctrl+C para detener el servidor');
});
