import type { IconName } from "./icons";

export const site = {
  doctorName: "Dra. Jazmín Álvarez",
  specialty: "Medicina Estética y Restauración Capilar",
  whatsappNumber: "523310947178",
  whatsappDisplay: "+52 33 1094 7178",
  whatsappUrl:
    "https://wa.me/523310947178?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20valoraci%C3%B3n%20capilar.",
  instagramUrl: "https://www.instagram.com/drajazminalvarez",
  instagramHandle: "@drajazminalvarez",
  /** Página de Facebook. Mientras esté vacío, el botón de Facebook no se muestra. */
  facebookUrl: "https://www.facebook.com/mannlichhair/",
  facebookName: "Dra. Jazmín Álvarez",
  clinic: "Hospital Real San José, Valle Real. Consultorio 6A, Piso 4",
  /** Domicilio completo, una línea por renglón. */
  address: ["Av. Central No. 911", "Col. Residencial Poniente", "C.P. 45136, Zapopan, Jal."],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Hospital%20Real%20San%20Jos%C3%A9%20Valle%20Real%20Zapopan",
};

export type TreatmentIcon = Extract<IconName, "hair" | "face" | "syringe" | "sparkles">;

export type Treatment = {
  id: string;
  title: string;
  icon: TreatmentIcon;
  summary: string;
};

/** Tratamientos que aparecen en el menú, la portada y la página de tratamientos. */
export const treatments: Treatment[] = [
  {
    id: "restauracion-capilar",
    title: "Restauración Capilar",
    icon: "hair",
    summary:
      "Valoración del patrón de pérdida, la zona donante y tus objetivos para definir si el injerto capilar u otro protocolo es la opción adecuada.",
  },
  {
    id: "rejuvenecimiento-facial",
    title: "Rejuvenecimiento Facial",
    icon: "face",
    summary:
      "Alternativas médicas para mejorar la calidad, firmeza y luminosidad de la piel, definidas después de revisar tu caso.",
  },
  {
    id: "medicina-estetica",
    title: "Medicina Estética",
    icon: "syringe",
    summary:
      "Tratamientos médico-estéticos enfocados en cuidar la armonía facial y mantener resultados sutiles y naturales.",
  },
  {
    id: "tratamientos-personalizados",
    title: "Tratamientos Personalizados",
    icon: "sparkles",
    summary:
      "Una valoración clínica para revisar tu caso, resolver dudas y construir un plan con pasos claros.",
  },
];

/**
 * Cifras de la sección "Cambios que se notan".
 * PENDIENTE: confirmar con la doctora. Mientras `confirmed` sea false, el sitio
 * muestra la etiqueta "Dato por confirmar" junto a cada cifra. La publicidad de
 * servicios de salud no debe incluir cifras que no se puedan comprobar (COFEPRIS).
 */
export const stats = {
  confirmed: false,
  items: [
    { icon: "calendar", value: "+5 años", label: "de experiencia" },
    { icon: "people", value: "+300", label: "pacientes atendidos" },
    { icon: "star", value: "Alta satisfacción", label: "de resultados" },
  ],
} as const;

export type Service = {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  /** Ancla a una sección con más información, si existe. */
  details?: string;
};

/** Servicios que ofrece la doctora (sección "Servicios" dentro de Tratamientos). */
export const services: Service[] = [
  {
    id: "consulta-tricologia",
    title: "Consulta de Tricología y Medicina Estética",
    icon: "hair",
    summary: "Valoración médica del cabello, cuero cabelludo y plan personalizado.",
  },
  {
    id: "injerto-capilar",
    title: "Restauración e Injerto Capilar",
    icon: "hair",
    summary: "Evaluación de la zona donante y diseño de la línea capilar para un resultado natural.",
  },
  {
    id: "botox-facial",
    title: "Toxina Botulínica (Botox®)",
    icon: "syringe",
    summary: "Suaviza líneas de expresión, previene arrugas y rejuvenece tu rostro.",
  },
  {
    id: "hiperhidrosis",
    title: "Toxina Botulínica (Botox®) para Hiperhidrosis",
    icon: "syringe",
    summary: "Tratamiento médico para la sudoración excesiva en axilas, manos o pies.",
    details: "#hiperhidrosis",
  },
  {
    id: "relleno-labios",
    title: "Relleno de Labios con Ácido Hialurónico",
    icon: "lips",
    summary: "Aporta volumen, hidratación y definición a tus labios, respetando tus proporciones.",
  },
  {
    id: "dermapen",
    title: "Dermapen para Rejuvenecimiento Facial",
    icon: "pen",
    summary: "Microagujas que estimulan el colágeno, mejoran la textura, los poros y las cicatrices leves.",
  },
  {
    id: "yellow-peel",
    title: "Yellow Peel",
    icon: "sparkles",
    summary: "Peeling que ayuda a unificar el tono, reducir manchas y devolver luminosidad a la piel.",
  },
];

/**
 * Opiniones de 5 estrellas tomadas de Google (perfil "Dra Jazmin Alvarez. Medicina
 * estética y tratamiento capilar"). Para agregar una, copia el texto tal cual aparece
 * en Google. `rating` y `count` son el resumen que muestra Google.
 */
export const googleReviews = {
  rating: "5.0",
  count: 23,
  url: "https://www.google.com/search?q=Dra+Jazmin+Alvarez+Medicina+est%C3%A9tica+y+tratamiento+capilar+Zapopan#lrd=,1,,,",
  /** Opiniones de 5 estrellas (mínimo 5), de la más nueva a la más antigua. */
  items: [
    {
      name: "Carlos Alex G.",
      when: "Hace un mes",
      text: "Super recomendado, empecé el tratamiento con la Dra Jazmín y solo he tenido muy buenos resultados!!",
    },
    {
      name: "Jorge Jair P.",
      when: "Hace 2 meses",
      text: "Toda una profesional y experta en tema de tricología, me ha ayudado bastante a recuperar mi cabello.",
    },
    {
      name: "Angel C.",
      when: "Hace 3 meses",
      text: "He ido constantemente con la doctora para distintos tratamientos de crecimiento de barba, de cabello y tratamientos estéticos como peelings, baby face, etc. Siempre muy profesional, explica muy bien los términos y tratamientos, así como el seguimiento. Muy recomendada.",
    },
    {
      name: "Yoltic Quetzalcóatl M.",
      when: "Hace 3 meses",
      text: "Excelente servicio, la doctora escucha con paciencia y empatía, mi tratamiento tiene muy buenos resultados, el hospital es de primer nivel y muy puntual y acertiva en todo.",
    },
    {
      name: "Luis Fernando A.",
      when: "Hace 3 meses",
      text: "Llevé un par de tratamientos con ella y siempre me sentí en las mejores manos. Su atención, profesionalismo y dedicación hicieron toda la diferencia.",
    },
    {
      name: "Elizabeth A.",
      when: "Hace 5 meses",
      text: "Muy buena atención y súper profesional. Me explicó todo de forma clara y me hizo sentir muy cómoda en la consulta. Se nota que sabe muchísimo sobre cuidado capilar. La recomiendo mucho.",
    },
    {
      name: "Karla L.",
      when: "Hace un año",
      text: "La Dra. Jazmín fue súper amable con mi mamá al momento de su valoración, le explicó su cuadro de manera muy detallada y le dio las mejores opciones de tratamiento! Es una persona increíblemente amable y con mucha calidez humana, se nota lo mucho que ama su trabajo. La recomiendo ampliamente!",
    },
  ],
};

/** Cédula y registros profesionales de la doctora (Sobre mí y pie de página). */
export const credentials = {
  fullName: "Dra. Tania Jazmín Álvarez de Anda",
  cedula: "9848556",
  cedulaSource: "DGP · Universidad de Guadalajara",
  items: [
    { label: "Cédula profesional", value: "9848556", detail: "DGP · Universidad de Guadalajara" },
    { label: "Tricología", value: "20211361", detail: "Registro de especialidad" },
    { label: "Medicina Estética", value: "1416CEECB0005", detail: "STPS" },
    { label: "COFEPRIS", value: "2614102002A00811", detail: "Registro sanitario" },
  ],
  cofepris: "2614102002A00811",
  verifyUrl: "https://cedulaprofesional.sep.gob.mx/",
};
