"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Board, Led } from "johnny-five";

export default function Dashboard() {
  const board = new Board();
  const led = new Led(13);

  function startBoard() {
    board.on("ready", () => {
      board.repl.inject({
        led,
      });
    });
  }

  function makeLedBlink() {
    led.blink(1000);
  }

  function stopLedBlink() {
    led.stop();
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <div>
        <Button onClick={() => startBoard()}>StartBoard</Button>
        <Button onClick={() => makeLedBlink()}>MakeLedBlink</Button>
        <Button onClick={() => stopLedBlink()}>StopLedBlink</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Weather</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>To-do List</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
}
