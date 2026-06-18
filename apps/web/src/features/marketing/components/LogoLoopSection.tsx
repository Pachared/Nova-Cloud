import LogoLoop from "../style/LogoLoop";
import { techLogosConstants } from "../constants/constants";

function LogoLoopSection() {
  return (
    <div>
      <LogoLoop
        logos={techLogosConstants}
        speed={50}
        direction="left"
        logoHeight={50}
        gap={80}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
        style ={{ color: "oklch(70.8% 0 0)" }}
      />
    </div>
  );
}

export default LogoLoopSection;
