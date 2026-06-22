import type { IconType } from "react-icons";

type Props = {
  name: string;
  services: number;
  icons: IconType[];
};

function ProjectCard({ name, services, icons }: Props) {
  return (
    <a
      href="#"
      aria-label={`View ${name}`}
      className="group rounded-lg border border-[#7c3aed]/25 bg-[#151020] p-3 transition hover:-translate-y-0.5 hover:border-[#c084fc]/70 hover:bg-[#1d1630] hover:shadow-[0_20px_70px_rgba(124,58,237,0.18)]"
    >
      <h2 className="text-sm font-bold text-white">{name}</h2>
      <div className="mt-4 flex min-h-44 items-center justify-center rounded bg-[#080610] bg-[radial-gradient(circle,rgba(192,132,252,0.16)_1px,transparent_1px)] bg-[size:10px_10px] p-4">
        <div className="grid grid-cols-4 gap-3">
          {icons.map((Icon, index) => (
            <span
              key={`${name}-${index}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#7c3aed]/25 bg-[#211831] text-lg text-[#67e8f9] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <Icon aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9]" />
        production · {services}/{services} {services === 1 ? "service" : "services"} online
      </p>
    </a>
  );
}

export default ProjectCard;
