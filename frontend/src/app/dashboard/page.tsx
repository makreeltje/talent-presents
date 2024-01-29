"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Light = {
  id: string;
  name: string;
  isActive: boolean;
};

export default function Lights() {
  const [lights, setLights] = useState<Light[]>([]);

  function toggleActive(light: Light) {
    setLights((prev) => {
      const index = prev.findIndex((l) => l.id == light.id);
      if (index >= 0) {
        const newLight = { ...light, isActive: !light.isActive };
        const newPrev = prev.with(index, newLight);
        return [...newPrev];
      }
      return prev;
    });
  }

  return (
    <>
      <div className="flex items-center space-x-5">
        <h1 className="font-semibold text-lg md:text-2xl">Lights</h1>
        <AddNewLight
          addNewLight={(light) => {
            setLights((prev) => {
              return [...prev, light];
            });
          }}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {lights.length < 1 ? (
          <h2>You have no lights configured yet</h2>
        ) : (
          <>
            {lights.map((light) => (
              <Light
                light={light}
                key={v4()}
                toggleActive={(l) => toggleActive(l)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

type LightProps = {
  light: Light;
  toggleActive: (light: Light) => void;
};

function Light({ light, toggleActive }: LightProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{light.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className=" border cursor-pointer bg-red-700 data-[active=true]:bg-green-700 "
          data-active={light.isActive}
          onClick={() => toggleActive(light)}
        >
          {light.isActive ? "on" : "off"}
        </Button>
      </CardContent>
    </Card>
  );
}

type AddNewLightProps = {
  addNewLight: (light: Light) => void;
};

export function AddNewLight({ addNewLight }: AddNewLightProps) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    addNewLight({ id: v4(), name: values.name, isActive: false });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new light</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new light</DialogTitle>
          <DialogDescription>
            Enter a name for your light here. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Light ..." {...field} />
                  </FormControl>
                  <FormDescription>This is your lights name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
