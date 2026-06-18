import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGithub,
  SiSvelte,
  SiNuxt,
  SiBootstrap,
  SiVite,
  SiHtml5,
} from "react-icons/si";

import { IoLogoVue } from "react-icons/io5";

export const HeroConstants = {
  mainTitle: "Nova Cloud กับการ",
  subTitle: "ทั้งหมดในกระบวนการเดียว.",
  description:
    "ทุกสิ่งที่คุณต้องการสำหรับการจัดการ Infrastructure อยู่ในแพลตฟอร์มเดียว จบครบ ไม่ซับซ้อน",
  buttonTextNewProject: "สร้างโปรเจกต์ใหม่ของคุณ",
};

export const CurvedLoopSectionConstants = {
  marqueeText:
    "✦ พัฒนาระบบ ✦ ตรวจสอบทดสอบ ✦ นำระบบขึ้นใช้งาน ✦ ทำหน้าเว็บไซต์แนะนำสินค้า/บริการ ✦ สร้างระบบเว็บแอปพลิเคชัน",
};

export const techLogosConstants = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next", href: "https://nextjs.org" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <IoLogoVue />, title: "Vue", href: "https://vuejs.org" },
  { node: <SiSvelte />, title: "Svelte", href: "https://svelte.dev" },
  { node: <SiNuxt />, title: "Nuxt", href: "https://nuxt.com" },
  {
    node: <SiBootstrap />,
    title: "Bootstrap",
    href: "https://getbootstrap.com",
  },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  {
    node: <SiHtml5 />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
];

export const LoginText ={
  welcomeMessage: "ยินดีต้อนรับสู่ Nova",
  instructionMessage: "Deploy ง่ายด้วย GitHub Repository ",
  githubButtonText: "ดำเนินการต่อด้วย Github",
};
