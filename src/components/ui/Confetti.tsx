"use client";
import { useEffect, useState } from "react";
import Confetti from 'react-dom-confetti'

export default function Confetti() {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true), [showConfetti, setShowConfetti]);

  return (
    <div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
    </div>
  );
}
