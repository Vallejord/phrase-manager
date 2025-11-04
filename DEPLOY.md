# Deployment a GitHub Pages

## Configuración Inicial (Solo una vez)

1. **Habilitar GitHub Pages en tu repositorio:**
   - Ve a tu repositorio en GitHub: https://github.com/Vallejord/phrase-manager
   - Settings → Pages
   - En "Source", selecciona "GitHub Actions"

## Métodos de Deployment

### Opción 1: Deployment Manual

Ejecuta en tu terminal:

```bash
npm run deploy
```

Esto construirá la app y la subirá a la rama `gh-pages`.

**Nota:** Si usas el método manual, necesitas cambiar el source en GitHub Pages:
- Settings → Pages → Source: selecciona "Deploy from a branch"
- Branch: selecciona `gh-pages` y carpeta `/ (root)`

### Opción 2: Deployment Automático (Recomendado)

Con GitHub Actions, cada push a `main` desplegará automáticamente.

1. **Configura GitHub Pages:**
   - Ve a Settings → Pages
   - Source: selecciona "GitHub Actions"

2. **Haz push de tus cambios:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

3. **Verifica el deployment:**
   - Ve a la pestaña "Actions" en tu repositorio
   - Verás el workflow "Deploy to GitHub Pages" ejecutándose
   - Una vez completado, tu app estará disponible en:
     https://vallejord.github.io/phrase-manager/

## URLs

- **App en producción:** https://vallejord.github.io/phrase-manager/
- **Repositorio:** https://github.com/Vallejord/phrase-manager

## Verificación Local

Antes de deployar, puedes verificar que la build funciona:

```bash
npm run build
npm run preview
```

Esto simulará el entorno de producción localmente.

## Troubleshooting

### La app muestra páginas en blanco
- Verifica que `base: '/phrase-manager/'` esté en `vite.config.js`
- Asegúrate de que el source en GitHub Pages esté configurado correctamente

### Los cambios no se reflejan
- Espera unos minutos (GitHub Pages puede tardar)
- Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
- Verifica que el workflow en Actions se haya completado exitosamente

### Error en el workflow de GitHub Actions
- Revisa los logs en la pestaña "Actions"
- Asegúrate de que los tests pasen localmente: `npm test -- --run`

