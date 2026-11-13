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
  clinic: "Hospital Real San José Valle Real, Piso 4, Consultorio 6-A",
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
  title: string;
  icon: TreatmentIcon;
  summary: string;
  /** Ancla a una sección con más información, si existe. */
  details?: string;
};

/** Servicios que ofrece la doctora (sección "Servicios" dentro de Tratamientos). */
export const services: Service[] = [
  {
    title: "Consulta de tricología y medicina estética",
    icon: "sparkles",
    summary: "Valoración médica del cabello, el cuero cabelludo y la piel para definir el tratamiento adecuado para ti.",
  },
  {
    title: "Restauración e injerto capilar",
    icon: "hair",
    summary: "Evaluación de la zona donante y del patrón de pérdida para planear un injerto con resultados naturales.",
  },
  {
    title: "Toxina botulínica (Botox) para rejuvenecimiento facial",
    icon: "face",
    summary: "Suaviza las líneas de expresión de frente, entrecejo y patas de gallo, cuidando la naturalidad del rostro.",
  },
  {
    title: "Toxina botulínica (Botox) para hiperhidrosis",
    icon: "syringe",
    summary: "Tratamiento médico para la sudoración excesiva en axilas, manos o pies.",
    details: "#hiperhidrosis",
  },
  {
    title: "Relleno de labios con ácido hialurónico",
    icon: "syringe",
    summary: "Aporta volumen, hidratación y definición a los labios, respetando tus proporciones.",
  },
  {
    title: "Dermapen para rejuvenecimiento facial",
    icon: "face",
    summary: "Microagujas que estimulan el colágeno para mejorar la textura, los poros y las cicatrices leves.",
  },
  {
    title: "Yellow peel",
    icon: "sparkles",
    summary: "Peeling que ayuda a unificar el tono, reducir manchas y devolver luminosidad a la piel.",
  },
];
