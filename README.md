# HomePro360 — Etapa 1

Web app en un solo `index.html` con Firebase (Auth + Firestore). Incluye cuentas con roles (cliente, prestador, admin), aprobación de prestadores, turnos reales con reserva sin doble booking, seguimiento de la orden en tiempo real y reseñas verificadas. El pago se coordina por fuera (efectivo o transferencia) y queda indicado en cada orden.

## 1. Configurar Firebase (proyecto HomePro)
1. **Authentication → Sign-in method**: habilitar *Correo electrónico/contraseña*.
2. **Firestore Database**: si todavía no la creaste, crearla en modo producción (región `southamerica-east1`).
3. **Configuración del proyecto → Tus apps → Web (`</>`)**: registrar la app y copiar `firebaseConfig`.
4. Pegar esos valores en `index.html`, en la constante `firebaseConfig` (arriba del script).
5. **Firestore → Reglas**: pegar el contenido de `firestore.rules` y **Publicar**.
6. **Authentication → Configuración → Dominios autorizados**: agregar el dominio de Vercel (ej. `homepro-xxxx.vercel.app`) y el que uses en producción.

## 2. Subir y desplegar
1. En tu repo de GitHub subí `index.html`, `firestore.rules` y este `README.md`. El archivo debe llamarse exactamente `index.html` (sin doble extensión).
2. En Vercel: *Add New → Project*, elegí el repo y desplegá (no requiere build; es un sitio estático).

## 3. Crear el primer admin
1. Registrá una cuenta desde la app como **cliente** con tu email.
2. En Firestore, abrí `users/<tu UID>` (el UID está en Authentication → Usuarios) y cambiá el campo `role` a `admin`.
3. Cerrá sesión y volvé a entrar: vas a ver la pantalla **Prestadores** para aprobar o rechazar perfiles.

## 4. Primera prueba completa (con 3 cuentas o 3 navegadores)
1. Cuenta A: registrarse como **prestador** (queda pendiente).
2. Cuenta admin: aprobar a A.
3. Cuenta A: publicar turnos en **Turnos**.
4. Cuenta B (cliente): reservar un turno desde **Servicios**.
5. Cuenta A: avanzar el estado (en camino → en ejecución → finalizado).
6. Cuenta B: confirmar el trabajo y calificar.

## App instalable en el celular (PWA)
Subí también `manifest.webmanifest`, `sw.js` y la carpeta `icons/` (con sus 3 imágenes), en la misma carpeta que `index.html`. La web tiene que servirse por HTTPS (Vercel y Firebase Hosting ya lo hacen).
- **Android (Chrome):** aparece el botón «Instalar» en la pantalla de ingreso y en Perfil, o menú ⋮ → *Instalar app*.
- **iPhone (Safari):** Compartir → *Agregar a pantalla de inicio*. La app muestra esta indicación en iPhone.
- Sin conexión se abre la pantalla de la app, pero los datos requieren internet.
- Las actualizaciones de `index.html` llegan al abrir la app con conexión. Si cambiás íconos o manifiesto, subí el número de versión en `sw.js` (`homepro-v1` → `homepro-v2`).

## Limitaciones conocidas de esta etapa
- Un cliente malintencionado podría reservar un turno sin crear la orden (las reglas no pueden vincular ambas escrituras). Es un riesgo menor a esta escala; se resuelve con una Cloud Function en la Etapa 2.
- Las calificaciones promedio se calculan en el navegador leyendo todas las reseñas: sirve para cientos de reseñas, no para miles.
- Sin notificaciones push, fletes ni herramientas todavía.
