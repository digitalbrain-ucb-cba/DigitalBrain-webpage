# HANDOFF — DigitalBrain Webpage

Documento para quien herede el proyecto. Escrito en 2026-09-16 por Alejandro Montero.

Si algo de acá no coincide con la realidad, cree a la realidad y actualizá este archivo.

---

## 1. Qué es esto

App Angular que se publica en <https://digitalbrain.cba.ucb.edu.bo>.

Repo: este mismo. Rama principal: `main`.

## 2. Cómo se despliega (resumen de 30 segundos)

Cuando se mergea un PR a `main`, se dispara automáticamente:

1. GitHub Actions arma el proyecto (solo para verificar que compila).
2. GitHub Actions manda un POST a una URL secreta (ngrok) que apunta al server.
3. El server recibe el POST, hace `git pull`, compila el Angular y copia los archivos a la carpeta que sirve Apache.
4. El sitio queda actualizado en <https://digitalbrain.cba.ucb.edu.bo>.

**No hay que hacer nada más que mergear el PR.** Si el deploy falla, ver "Cuando algo falla" abajo.

## 3. Archivos clave del deploy

- `.github/workflows/angular_deploy.yml` — el workflow que se dispara en push a `main`.
- `.github/workflows/angular_ci.yml` — se corre en cada PR para verificar que compila antes de mergear.
- En el server (no en este repo): `~/webhook_server.py` — script Flask que recibe la señal y hace el despliegue.

## 4. Acceso al server

- **Método actual:** TeamViewer.
  - ID: `297554520`
  - Contraseña: preguntar a Alejandro / al responsable actual (no está en el repo, obvio).
  - Usuario del sistema en el server: `ucb-neurotech`
- **Ubicación física:** VM en la UCB. Hay muchos servers en el rack; si nunca lo viste, no vas a poder identificarlo solo.
- **La conexión de TeamViewer es inestable.** Puede cortarse. Reintentar.

## 5. Rutas importantes en el server

| Qué                                    | Dónde                                                  |
|----------------------------------------|--------------------------------------------------------|
| Repo clonado                           | `/home/ucb-neurotech/Desktop/DigitalBrain-webpage`     |
| Webhook (script Flask)                 | `/home/ucb-neurotech/webhook_server.py`                |
| Logs del webhook                       | `/home/ucb-neurotech/nohup.out`                        |
| Carpeta que sirve Apache               | `/var/www/html`                                        |
| Config de Apache                       | `/etc/apache2/sites-available/000-default.conf`        |

## 6. Piezas externas del sistema

- **ngrok** — expone el puerto 5000 del server a internet. Corre a mano en una terminal del server.
  - Cuenta: `digitalbrain.ucb.cba@gmail.com` (plan free).
  - La URL pública que genera ngrok debe estar cargada como secret `SERVER_WEBHOOK_URL` en GitHub → Settings → Secrets and variables → Actions.
  - **Si ngrok se reinicia, la URL cambia y hay que actualizar el secret en GitHub.** Esto es un dolor conocido, ver sección 9.
- **Apache** — sirve el sitio en el puerto 443 (con redirect desde 80). Ya está configurado, no tocar salvo emergencia.
- **Node.js** — instalado global vía apt (Nodesource). Versión actual: **v22.x** (subida en septiembre 2026 porque Angular 21 requiere Node 20+).

## 7. Cuando algo falla

### El workflow "Angular Deploy" falla con `curl: (22) error 500`

Significa que el server recibió la señal pero algo se rompió durante el despliegue. Pasos:

1. Entrar al server por TeamViewer.
2. Ver los logs del webhook:
   ```bash
   tail -n 100 ~/nohup.out
   ```
3. Buscar el último `ERROR` — te dice en qué paso falló (`git pull`, build, o copia).

**Casos vistos hasta hoy:**

- **`git pull` falla**: casi siempre porque hay cambios locales en el server que chocan con lo que viene de `main`. Fix:
  ```bash
  cd /home/ucb-neurotech/Desktop/DigitalBrain-webpage
  git status                        # ver qué está sucio
  git stash -u -m "server-junk"     # apartar los cambios locales
  git pull                          # ahora sí
  ```
  Después re-run del workflow desde GitHub Actions.

- **Build falla con error de versión de Node**: Angular subió de versión y el Node del server quedó viejo. Actualizar con Nodesource:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_XX.x | sudo -E bash -
  sudo apt-get install -y nodejs
  node -v
  ```
  Reemplazá `XX` con la versión que pida Angular (ver `package.json` → `engines`, si existe, o el error de Angular).

- **Todos los POST devuelven 500 y `nohup.out` no muestra nada nuevo**: el proceso Flask está muerto. Reiniciar:
  ```bash
  sudo pkill -f webhook_server.py
  nohup python3 ~/webhook_server.py > ~/nohup.out 2>&1 &
  ```

### El sitio se ve pero está desactualizado

El deploy quedó a medias (build OK pero copia falló) o Apache está cacheando. Chequear `/var/www/html`:

```bash
ls -la /var/www/html
```

Si los archivos son viejos, correr el flujo del webhook a mano en el server:

```bash
cd /home/ucb-neurotech/Desktop/DigitalBrain-webpage
git pull
npm install
npx ng build --configuration production
cp -r dist/digital-brain-webpage/browser/. /var/www/html/
```

### La URL de ngrok cambió (el secret `SERVER_WEBHOOK_URL` está desactualizado)

Ver sección 9 más abajo.

## 8. Qué hacer para un cambio "normal" en el código

1. Crear rama, hacer cambios, abrir PR contra `main`.
2. Esperar a que pase el workflow "Angular CI".
3. Mergear.
4. El deploy se dispara solo. Ver la pestaña Actions del repo para confirmar que quedó verde.

Si querés probar local antes:

```bash
npm install
npm start   # o npx ng serve
```

## 9. Cosas rotas que conviene saber (pero no las arreglé porque me voy)

Estas son cosas que funcionan "de milagro" o que van a doler tarde o temprano. Documentado para que si alguien las nota, no piense que las inventó:

1. **Ngrok free se reinicia = deploy se cae.** La URL cambia y hay que actualizar el secret `SERVER_WEBHOOK_URL` en GitHub Actions. Solución real: pagar ngrok para tener dominio fijo, o migrar a Tailscale/Cloudflare Tunnel.

2. **El webhook no tiene autenticación.** Cualquiera que descubra la URL de ngrok puede disparar deploys. En los logs se ven bots de internet golpeando. No es urgente porque solo pueden disparar un `git pull` de `main`, pero no está bueno.

3. **`rm -rf /var/www/html/*` en el webhook no borra nada.** El asterisco no se expande porque se pasa sin `shell=True`. La copia siguiente sobreescribe, así que "funciona", pero archivos viejos de builds anteriores quedan como zombies si Angular alguna vez renombra o borra algo del bundle. Si el sitio muestra algo raro que no está en el código actual, mirar `/var/www/html` a mano.

4. **El build del runner de GitHub Actions se descarta.** El único build que llega a producción es el que hace el server. Sería más limpio subir el `dist/` como artifact y bajarlo en el server, o directamente `rsync` desde el runner, pero eso implica montar SSH en el server.

5. **No hay lock de despliegue.** Si se mergean dos PRs seguidos, dos `git pull` + `ng build` pueden pisarse. En la práctica no pasó nunca porque no somos tanta gente, pero puede pasar.

6. **El estado "success" en la pestaña Deployments de GitHub no garantiza que el server actualizó de verdad.** Marca "success" cuando el `curl` recibe 200, pero el server puede seguir compilando después. Si algo falla ahí, el "success" queda mintiendo.

## 10. A quién preguntarle

- Alejandro Montero — `montero.coca.alejandro@gmail.com` — creó todo esto en 2024, actualizó Node y arregló un deploy en septiembre 2026. No va a seguir trabajando en el proyecto, pero para preguntas puntuales de "¿por qué está así?" probablemente conteste.

## 11. Si querés reemplazar todo este circo por algo más simple

Está en el radar hace tiempo: matar el webhook Flask + ngrok y reemplazarlo por `rsync` sobre SSH (con Tailscale para no depender de que la UCB abra puertos). Queda una `.github/workflows/angular_deploy.yml` de 20 líneas y nada corriendo en el server salvo Apache. Si algún día querés hacer eso, hablalo con alguien que sepa infra — no es difícil pero requiere una tarde de setup en el server.
