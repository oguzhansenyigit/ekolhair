export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "EKOL HAIR PROTEZ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ekohair.oguzhansenyigit.com",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "0532 000 00 00",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "905320000000",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "info@ekohair.oguzhansenyigit.com",
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS || "Bahçelievler, İstanbul",
  tagline: "Doğal Görünümlü Protez Saç Çözümleri",
  geo: {
    lat: "41.0022",
    lng: "28.8597",
    region: "TR-34",
    locality: "İstanbul",
    district: "Bahçelievler",
    country: "TR",
  },
} as const;

export const ISTANBUL_DISTRICTS = [
  "Adalar",
  "Arnavutköy",
  "Ataşehir",
  "Avcılar",
  "Bağcılar",
  "Bahçelievler",
  "Bakırköy",
  "Başakşehir",
  "Bayrampaşa",
  "Beşiktaş",
  "Beykoz",
  "Beylikdüzü",
  "Beyoğlu",
  "Büyükçekmece",
  "Çatalca",
  "Çekmeköy",
  "Esenler",
  "Esenyurt",
  "Eyüpsultan",
  "Fatih",
  "Gaziosmanpaşa",
  "Güngören",
  "Kadıköy",
  "Kağıthane",
  "Kartal",
  "Küçükçekmece",
  "Maltepe",
  "Pendik",
  "Sancaktepe",
  "Sarıyer",
  "Silivri",
  "Sultanbeyli",
  "Sultangazi",
  "Şile",
  "Şişli",
  "Tuzla",
  "Ümraniye",
  "Üsküdar",
  "Zeytinburnu",
] as const;

export const PRIORITY_DISTRICTS = ["Bahçelievler", "Bağcılar", "Güngören"] as const;

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ş: "s",
    Ş: "s",
    ı: "i",
    İ: "i",
    ğ: "g",
    Ğ: "g",
    ü: "u",
    Ü: "u",
    ö: "o",
    Ö: "o",
    ç: "c",
    Ç: "c",
  };
  return text
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}/${path.replace(/^\//, "")}`;
}

export type BeforeAfterCase = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
};

export function beforeAfterCases(): BeforeAfterCase[] {
  return [
    {
      id: 1,
      title: "Müşteri Deneyimi 1",
      subtitle: "Doğal yoğunluk ve hat düzeltme",
      images: Array.from({ length: 7 }, (_, i) =>
        `/assets/images/before-after/1/musteri1-${String(i + 1).padStart(2, "0")}.jpg`
      ),
    },
    {
      id: 2,
      title: "Müşteri Deneyimi 2",
      subtitle: "Ön çizgi ve tepe bölgesi güçlendirme",
      images: Array.from({ length: 6 }, (_, i) =>
        `/assets/images/before-after/2/musteri2-${String(i + 1).padStart(2, "0")}.jpg`
      ),
    },
    {
      id: 3,
      title: "Müşteri Deneyimi 3",
      subtitle: "Tam kapsama protez saç uygulaması",
      images: Array.from({ length: 7 }, (_, i) =>
        `/assets/images/before-after/3/musteri3-${String(i + 1).padStart(2, "0")}.jpg`
      ),
    },
  ];
}
