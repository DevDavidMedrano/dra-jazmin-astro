# Despliegue en el VPS (drajazminalvarez.com)

- Servidor: `38.58.157.217` (`vps-212-z2vf1`, Ubuntu), usuario `root`
- DNS en GoDaddy: `A @ → 38.58.157.217`, `CNAME www → drajazminalvarez.com`
- Archivos: `/var/www/drajazminalvarez`
- Nginx: `/etc/nginx/sites-available/zz-drajazminalvarez` (copia de `nginx-drajazminalvarez.conf`)

**El servidor es compartido**: también corre ZYNEX (`/etc/nginx/sites-enabled/zynex`, Docker).
No borres el sitio `default`/`zynex`, no actives `ufw` y no corras `setup-server.sh` aquí: ese
script es para un VPS vacío. El prefijo `zz-` mantiene a zynex como sitio por defecto de Nginx.

## Publicar cambios (cada vez)

```powershell
$env:VPS = "true"; & "C:\Program Files\nodejs\npm.cmd" run build; Remove-Item Env:VPS
tar -czf site.tgz -C dist .
scp site.tgz root@38.58.157.217:/tmp/
ssh root@38.58.157.217 "rm -rf /var/www/drajazminalvarez/* && tar -xzf /tmp/site.tgz -C /var/www/drajazminalvarez && rm /tmp/site.tgz"
Remove-Item site.tgz
```

## HTTPS (una vez, cuando el DNS ya apunte a 38.58.157.217)

```bash
certbot --nginx -d drajazminalvarez.com -d www.drajazminalvarez.com --redirect
```
