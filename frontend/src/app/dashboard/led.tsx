"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Led } from "./page";
import { ledOn, ledBlink, ledPulse, ledOff } from "./led-api-calls";
import IntervalInput from "./interval-input";

type LedProps = {
  led: Led;
  updateStatus: (led: Led) => void;
};

export default function Led({ led, updateStatus }: LedProps) {
  const ledOnMutation = useMutation({
    mutationFn: () => ledOn(led.port),
    onSuccess: (data) => {
      updateStatus({ ...led, isActive: true, pulse: false, blink: false });
      toast.success(data.text());
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const ledBlinkMutation = useMutation({
    mutationFn: (interval: number) => ledBlink(led.port, interval),
    onSuccess: (data, interval) => {
      updateStatus({
        ...led,
        blink: true,
        pulse: false,
        blinkInterval: interval,
      });
      toast.success(data.text());
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const ledPulseMutation = useMutation({
    mutationFn: (interval: number) => ledPulse(led.port, interval),
    onSuccess: (data, interval) => {
      updateStatus({
        ...led,
        pulse: true,
        blink: false,
        pulseInterval: interval,
      });
      toast.success(data.text());
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const ledOffMutation = useMutation({
    mutationFn: () => ledOff(led.port),
    onSuccess: (data) => {
      updateStatus({ ...led, isActive: false, pulse: false, blink: false });
      toast.success(data.text());
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  function toggleLed() {
    if (led.isActive) {
      ledOffMutation.mutate();
      return;
    }
    ledOnMutation.mutate();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{led.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className=" border cursor-pointer bg-red-700 data-[active=true]:bg-green-700 "
          data-active={led.isActive}
          onClick={() => toggleLed()}
        >
          {led.isActive ? "on" : "off"}
        </Button>
      </CardContent>
      <CardFooter className=" flex justify-evenly ">
        {led.isActive ? (
          <>
            <IntervalInput
              name="Blink"
              isActive={led.blink}
              onSubmitInterval={(interval) => ledBlinkMutation.mutate(interval)}
            />
            <IntervalInput
              name="Pulse"
              isActive={led.pulse}
              onSubmitInterval={(interval) => ledPulseMutation.mutate(interval)}
            />
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
}
