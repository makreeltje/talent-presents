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
import { ledOn, ledOff } from "./led-api-calls";
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

  //TODO Opdracht 4b

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
        <CardTitle className=" text-center ">{led.name}</CardTitle>
      </CardHeader>
      <CardContent className=" flex justify-center ">
        <Button
          className=" border cursor-pointer bg-red-700 data-[active=true]:bg-green-700 "
          data-active={led.isActive}
          onClick={() => toggleLed()}
        >
          {led.isActive ? "on" : "off"}
        </Button>
      </CardContent>
      {/* //TODO Opdracht 4b */}
      {/* <CardFooter className=" flex justify-evenly gap-5 ">
        {led.isActive ? (
          <>
            <IntervalInput
              name="Blink"
              isActive={led.blink}
              onSubmitInterval={(interval) => {
                toast.error("Not yet Implemented");
              }}
            />
            <IntervalInput
              name="Pulse"
              isActive={led.pulse}
              onSubmitInterval={(interval) => {
                toast.error("Not yet Implemented");
              }}
            />
          </>
        ) : (
          <></>
        )}
      </CardFooter> */}
    </Card>
  );
}
