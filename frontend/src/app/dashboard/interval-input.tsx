"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

type IntervalInputProps = {
  name: string;
  isActive: boolean;
  onSubmitInterval: (interval: number) => void;
};

export default function IntervalInput({
  name,
  isActive,
  onSubmitInterval,
}: IntervalInputProps) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    interval: z.number().min(50).max(9999),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interval: 1000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitInterval(values.interval);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={isActive ? "animate-pulse bg-green-500" : ""}
        >
          Add {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add {name}</DialogTitle>
          <DialogDescription>
            Set a interval and send the effect to the led.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="interval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interval</FormLabel>
                  <FormControl>
                    <Input placeholder="Unknown" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the interval for {name}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add {name}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
