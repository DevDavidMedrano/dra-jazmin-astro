#!/usr/bin/env bash
# Instalación inicial del VPS (Ubuntu/Debian). Se corre UNA vez como root.
# Instala Nginx, abre el firewall y saca el certificado HTTPS de Let's Encrypt.
set -euo pipefail

DOMAIN=drajazminalvarez.com
WEBROOT=/var/www/drajazminalvarez

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y nginx certbot python3-certbot-nginx

mkdir -p "$WEBROOT"
cp /tmp/nginx-drajazminalvarez.conf /etc/nginx/sites-available/drajazminalvarez
ln -sf /etc/nginx/sites-available/drajazminalvarez /etc/nginx/sites-enabled/drajazminalvarez
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx
systemctl reload nginx

if command -v ufw >/dev/null; then
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw --force enable
fi

# HTTPS (requiere que el DNS ya apunte a este servidor) + redirección http -> https
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos --register-unsafely-without-email --redirect

echo "Listo: https://$DOMAIN"
