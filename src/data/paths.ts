/**
 * Rutas internas del sitio.
 *
 * En GitHub Pages el sitio vive en una subcarpeta (/dra-jazmin-astro/), así que
 * toda ruta que empiece con "/" debe pasar por withBase(). En local y en Vercel
 * la base es "/" y las rutas quedan igual.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Antepone la base del sitio a una ruta absoluta: withBase("/images/a.webp"). */
export const withBase = (path: string) => `${BASE}${path}`;

/** Quita la base de una ruta del navegador, para comparar con rutas del sitio. */
export const stripBase = (pathname: string) => {
  const withoutBase = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return withoutBase.replace(/\/+$/, "") || "/";
};
