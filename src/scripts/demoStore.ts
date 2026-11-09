export const DEMO_CREDENTIALS = {
  email: "admin@drajazmin.mx",
  password: "DemoJazmin2026!",
};

export const DEFAULT_HERO_PHOTOS = [
  "/images/hero-doctor.webp",
  "/images/hero-doctor-02.webp",
  "/images/hero-doctor-03.webp",
  "/images/hero-doctor-04.webp",
  "/images/hero-doctor-05.webp",
  "/images/hero-doctor-06.webp",
];

export type DaySchedule = {
  enabled: boolean;
  times: string[];
};

export type WeeklySchedule = Record<string, DaySchedule>;

export type DemoSettings = {
  schedule: WeeklySchedule;
  hiddenHeroPhotos: string[];
  cofepris: string;
  profile: {
    name: string;
    headline: string;
    biography: string;
  };
};

export type AppointmentStatus = "hold" | "confirmed";

export type DemoAppointment = {
  id: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  status: AppointmentStatus;
  createdAt: number;
  expiresAt: number | null;
};

export type DemoBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  createdAt: number;
  published: boolean;
  mediaId?: string;
  mediaKind?: "image" | "video";
  externalVideoUrl?: string;
};

export type DemoMediaCategory = "hero" | "blog";

export type DemoMediaRecord = {
  id: string;
  name: string;
  mime: string;
  kind: "image" | "video";
  category: DemoMediaCategory;
  createdAt: number;
  blob: Blob;
};

const SETTINGS_KEY = "dra-jazmin-demo-settings-v1";
const APPOINTMENTS_KEY = "dra-jazmin-demo-appointments-v1";
const POSTS_KEY = "dra-jazmin-demo-posts-v1";
const SESSION_KEY = "dra-jazmin-demo-admin-session";
const MEDIA_DB = "dra-jazmin-demo-media";
const MEDIA_STORE = "files";

const defaultSchedule: WeeklySchedule = {
  "0": { enabled: false, times: [] },
  "1": { enabled: true, times: ["10:00", "11:30", "13:00", "16:30"] },
  "2": { enabled: true, times: ["10:00", "11:30", "13:00", "16:30"] },
  "3": { enabled: true, times: ["10:00", "11:30", "13:00", "16:30"] },
  "4": { enabled: true, times: ["10:00", "11:30", "13:00", "16:30"] },
  "5": { enabled: true, times: ["10:00", "11:30", "13:00", "16:30"] },
  "6": { enabled: true, times: ["10:00", "11:30"] },
};

const defaultSettings: DemoSettings = {
  schedule: defaultSchedule,
  hiddenHeroPhotos: [],
  cofepris: "Permiso de publicidad COFEPRIS: pendiente de capturar",
  profile: {
    name: "Dra. Jazmín Alvarez",
    headline: "Ciencia, precisión y atención cercana",
    biography:
      "Mi propósito es acompañarte con honestidad, cuidado y un plan diseñado para tus necesidades. La valoración es el espacio para escuchar lo que buscas y explicarte con claridad cada alternativa.",
  },
};

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const readJson = <T>(key: string, fallback: T): T => {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDemoSettings = (): DemoSettings => {
  const stored = readJson<Partial<DemoSettings>>(SETTINGS_KEY, {});
  const schedule = { ...defaultSchedule };

  Object.entries(stored.schedule ?? {}).forEach(([day, value]) => {
    schedule[day] = {
      enabled: Boolean(value?.enabled),
      times: Array.from(new Set(value?.times ?? [])).sort(),
    };
  });

  return {
    schedule,
    hiddenHeroPhotos: stored.hiddenHeroPhotos ?? [],
    cofepris: stored.cofepris ?? defaultSettings.cofepris,
    profile: {
      ...defaultSettings.profile,
      ...(stored.profile ?? {}),
    },
  };
};

export const saveDemoSettings = (settings: DemoSettings) => {
  writeJson(SETTINGS_KEY, settings);
};

export const getDemoAppointments = (): DemoAppointment[] => {
  const now = Date.now();
  const appointments = readJson<DemoAppointment[]>(APPOINTMENTS_KEY, []);
  const active = appointments.filter(
    (appointment) =>
      appointment.status === "confirmed" ||
      (appointment.expiresAt !== null && appointment.expiresAt > now),
  );

  if (active.length !== appointments.length) writeJson(APPOINTMENTS_KEY, active);
  return active.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
};

export const isDemoSlotTaken = (date: string, time: string) =>
  getDemoAppointments().some(
    (appointment) => appointment.date === date && appointment.time === time,
  );

export const createDemoHold = (details: {
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
}): DemoAppointment | null => {
  const appointments = getDemoAppointments();
  const conflict = appointments.some(
    (appointment) => appointment.date === details.date && appointment.time === details.time,
  );
  if (conflict) return null;

  const appointment: DemoAppointment = {
    id: makeId(),
    ...details,
    status: "hold",
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000,
  };
  appointments.push(appointment);
  writeJson(APPOINTMENTS_KEY, appointments);
  return appointment;
};

export const confirmDemoAppointment = (id: string) => {
  const appointments = getDemoAppointments().map((appointment) =>
    appointment.id === id
      ? { ...appointment, status: "confirmed" as const, expiresAt: null }
      : appointment,
  );
  writeJson(APPOINTMENTS_KEY, appointments);
};

export const deleteDemoAppointment = (id: string) => {
  writeJson(
    APPOINTMENTS_KEY,
    getDemoAppointments().filter((appointment) => appointment.id !== id),
  );
};

export const getDemoPosts = () =>
  readJson<DemoBlogPost[]>(POSTS_KEY, []).sort((a, b) => b.createdAt - a.createdAt);

export const saveDemoPost = (
  post: Omit<DemoBlogPost, "id" | "createdAt">,
): DemoBlogPost => {
  const posts = getDemoPosts();
  const saved = { ...post, id: makeId(), createdAt: Date.now() };
  posts.push(saved);
  writeJson(POSTS_KEY, posts);
  return saved;
};

export const deleteDemoPost = (id: string) => {
  writeJson(
    POSTS_KEY,
    getDemoPosts().filter((post) => post.id !== id),
  );
};

export const setDemoAdminSession = () => {
  sessionStorage.setItem(SESSION_KEY, "active");
};

export const clearDemoAdminSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const hasDemoAdminSession = () =>
  typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "active";

const openMediaDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(MEDIA_STORE)) {
        database.createObjectStore(MEDIA_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const saveDemoMedia = async (
  file: File,
  category: DemoMediaCategory,
): Promise<DemoMediaRecord> => {
  const record: DemoMediaRecord = {
    id: makeId(),
    name: file.name,
    mime: file.type,
    kind: file.type.startsWith("video/") ? "video" : "image",
    category,
    createdAt: Date.now(),
    blob: file,
  };
  const database = await openMediaDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE, "readwrite");
    transaction.objectStore(MEDIA_STORE).put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
  return record;
};

export const getDemoMedia = async (): Promise<DemoMediaRecord[]> => {
  const database = await openMediaDatabase();
  const records = await new Promise<DemoMediaRecord[]>((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE, "readonly");
    const request = transaction.objectStore(MEDIA_STORE).getAll();
    request.onsuccess = () => resolve(request.result as DemoMediaRecord[]);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return records.sort((a, b) => b.createdAt - a.createdAt);
};

export const getDemoMediaById = async (id: string): Promise<DemoMediaRecord | null> => {
  const database = await openMediaDatabase();
  const record = await new Promise<DemoMediaRecord | null>((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE, "readonly");
    const request = transaction.objectStore(MEDIA_STORE).get(id);
    request.onsuccess = () => resolve((request.result as DemoMediaRecord | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return record;
};

export const deleteDemoMedia = async (id: string) => {
  const database = await openMediaDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE, "readwrite");
    transaction.objectStore(MEDIA_STORE).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
};

export const getMediaObjectUrl = (record: DemoMediaRecord) => URL.createObjectURL(record.blob);

export const getVideoEmbedUrl = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace(/^\//, "");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
};
