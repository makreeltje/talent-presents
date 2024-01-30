"use client";
import { useState } from "react";
import { v4 } from "uuid";
import AddNewLed from "./add-new-led";
import Led from "./led";

export type Led = {
  id: string;
  name: string;
  isActive: boolean;
  blink: boolean;
  blinkInterval: number;
  pulse: boolean;
  pulseInterval: number;
  port: number;
};

export default function Leds() {
  const [leds, setLeds] = useState<Led[]>([]);

  function updateStatus(led: Led) {
    setLeds((prev) => {
      const index = prev.findIndex((l) => l.id == led.id);
      if (index >= 0) {
        const newPrev = prev.with(index, led);
        return [...newPrev];
      }
      return prev;
    });
  }

  return (
    <>
      <div className="flex items-center space-x-5">
        <h1 className="font-semibold text-lg md:text-2xl">Leds</h1>
        <AddNewLed
          addNewLed={(led) => {
            setLeds((prev) => {
              return [...prev, led];
            });
          }}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {leds.length < 1 ? (
          <h2>You have no leds configured yet</h2>
        ) : (
          <>
            {leds.map((led) => (
              <Led led={led} key={v4()} updateStatus={(l) => updateStatus(l)} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
