import React from "react";

import ScrollVelocity from "../style/ScrollVelocity";

function ScrollVelocitySection() {
  return (
    <div className="py-10 overflow-hidden">
      <ScrollVelocity
        texts={["Continuous Delivery", "Automate Everything"]}
        velocity={100}
        className="custom-scroll-text"
      />
    </div>
  );
}

export default ScrollVelocitySection;
