const defaultSiteUrl = "https://nova-cloud-ten.vercel.app";
const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl);

if (!["http:", "https:"].includes(configuredUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS URL");
}

// Local development URLs must never become the public canonical URL.
const isLocalUrl = ["localhost", "127.0.0.1", "[::1]"].includes(configuredUrl.hostname)
  || configuredUrl.hostname.endsWith(".localhost");
const publicUrl = new URL(isLocalUrl ? defaultSiteUrl : configuredUrl.origin);

export const site = {
  name: "Nova Cloud",
  url: publicUrl.origin,
  hostname: publicUrl.hostname,
  title: "Nova Cloud | Build และ Deploy โปรเจกต์จาก GitHub",
  description:
    "รู้จัก Nova Cloud แพลตฟอร์มสำหรับนักพัฒนา รวม workflow การ Build, Test และ Deploy จาก GitHub พร้อมแนวทางจัดการ services, databases และ infrastructure ในที่เดียว",
  imageAlt: "Nova Cloud — Build, Test และ Deploy โปรเจกต์จาก GitHub",
};

export const canIndexSite = process.env.NODE_ENV === "production"
  && process.env.VERCEL_ENV !== "preview"
  && publicUrl.protocol === "https:";
