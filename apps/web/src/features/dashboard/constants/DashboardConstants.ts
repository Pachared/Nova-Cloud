import {
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiCpu,
  FiDatabase,
  FiGrid,
  FiHelpCircle,
  FiLayers,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { SiDocker, SiNextdotjs, SiPostgresql, SiReact, SiRedis } from "react-icons/si";

export const dashboardNavItems = [
  { label: "Projects", icon: FiGrid, active: true },
  { label: "Templates", icon: FiLayers },
  { label: "Usage", icon: FiBarChart2 },
  { label: "People", icon: FiUsers },
  { label: "Settings", icon: FiSettings },
];

export const dashboardLinks = [
  { label: "Docs ↗", icon: FiBookOpen },
  { label: "Central Station ↗", icon: FiCpu },
  { label: "My support threads ↗", icon: FiHelpCircle },
];

export const projectCards = [
  {
    name: "CEO Partner",
    services: 1,
    icons: [SiNextdotjs],
  },
  {
    name: "Baawork Studio",
    services: 5,
    icons: [SiNextdotjs, SiDocker, SiReact, SiRedis, SiPostgresql],
  },
  {
    name: "RentFlow",
    services: 7,
    icons: [SiNextdotjs, SiPostgresql, SiDocker, FiBox, SiRedis, SiReact, FiDatabase],
  },
  {
    name: "Service-Booking-Template",
    services: 5,
    icons: [SiReact, SiReact, SiRedis, SiDocker, SiPostgresql],
  },
  {
    name: "MyCourse",
    services: 3,
    icons: [SiNextdotjs, SiReact, SiPostgresql],
  },
  {
    name: "Ecosystem Manager",
    services: 4,
    icons: [SiReact, SiPostgresql, SiRedis, SiDocker],
  },
  {
    name: "FULLTANK",
    services: 3,
    icons: [SiNextdotjs, SiRedis, SiDocker],
  },
];
