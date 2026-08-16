export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "EKOL HAIR PROTEZ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ekohair.oguzhansenyigit.com",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || "0532 000 00 00",
  whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "905320000000",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "info@ekohair.oguzhansenyigit.com",
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS || "Bahçelievler, İstanbul",
  tagline: "Doğal Görünümlü Protez Saç Çözümleri",
  geo: { lat: "41.0022", lng: "28.8597", region: "TR-34" },
};

export const ISTANBUL_DISTRICTS = [
  "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler",
  "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü",
  "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt",
  "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane",
  "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer",
  "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla",
  "Ümraniye", "Üsküdar", "Zeytinburnu",
] as const;

export const PRIORITY_DISTRICTS = ["Bahçelievler", "Bağcılar", "Güngören"] as const;

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return text
    .split("")
    .map((c) => map[c] ?? c)
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

export function waLink(text = "Merhaba, protez saç randevusu almak istiyorum"): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type BeforeAfterCase = {
  id: number;
  title: string;
  images: string[];
  before: string;
  after: string;
};

export function beforeAfterCases(): BeforeAfterCase[] {
  const counts: Record<number, number> = { 1: 7, 2: 6, 3: 7 };
  return ([1, 2, 3] as const).map((n) => {
    const images = Array.from({ length: counts[n] }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `/assets/images/before-after/${n}/musteri${n}-${num}.jpg`;
    });
    return {
      id: n,
      title: `Müşteri ${n}`,
      images,
      before: images[0],
      after: images[images.length - 1],
    };
  });
}
