import PixelBlast from "./PixelBlast";

function NewProjectBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-14 bottom-0 bg-[#0b0713]">
      <PixelBlast
        className="absolute inset-0"
        color="#B497CF"
        edgeFade={0.25}
        enableRipples
        liquid={false}
        liquidRadius={1}
        liquidStrength={0.1}
        liquidWobbleSpeed={4.5}
        noiseAmount={0}
        patternDensity={1}
        patternScale={2}
        pixelSize={4}
        pixelSizeJitter={0}
        rippleIntensityScale={1}
        rippleSpeed={0.3}
        rippleThickness={0.1}
        speed={0.5}
        transparent
        variant="square"
      />
    </div>
  );
}

export default NewProjectBackdrop;
