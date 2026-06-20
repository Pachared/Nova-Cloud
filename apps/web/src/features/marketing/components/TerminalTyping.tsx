"use client";

import { useEffect, useState } from "react";

type TerminalTypingProps = {
  command: string;
  output?: string;
  className?: string;
};

function TerminalTyping({ command, output, className }: TerminalTypingProps) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleLength((currentLength) => {
        if (currentLength >= command.length) {
          window.clearInterval(timer);
          return currentLength;
        }
        return currentLength + 1;
      });
    }, 26);

    return () => window.clearInterval(timer);
  }, [command]);

  const completed = visibleLength === command.length;

  return (
    <div className={className} aria-live="polite">
      <p>
        {command.slice(0, visibleLength)}
        <span className="ml-0.5 inline-block h-[1em] w-1 animate-pulse bg-current align-[-0.12em]" aria-hidden="true" />
      </p>
      {output && <p className={`transition-opacity duration-300 ${completed ? "opacity-100" : "opacity-0"}`}>{output}</p>}
    </div>
  );
}

export default TerminalTyping;
