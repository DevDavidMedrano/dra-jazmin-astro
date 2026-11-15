// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

/**
 * GITHUB_PAGES=true lo define el flujo .github/workflows/pages.yml.
 * GitHub Pages publica el sitio en una subcarpeta y sirve solo archivos
 * estáticos, así que ahí se usa la base /dra-jazmin-astro y no el adaptador
 * de Vercel.
 *
 * VPS=true es para el servidor propio (drajazminalvarez.com, Nginx): sitio
 * estático en la raíz del dominio, sin adaptador. Ver deploy/README.md.
 *
 * En local y en Vercel la configuración no cambia.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isVps = process.env.VPS === "true";

export default defineConfig(
  isGitHubPages
    ? {
        site: "https://devdavidmedrano.github.io",
        base: "/dra-jazmin-astro",
      }
    : isVps
      ? {
          site: "https://drajazminalvarez.com",
        }
      : {
          adapter: vercel(),
        },
);
