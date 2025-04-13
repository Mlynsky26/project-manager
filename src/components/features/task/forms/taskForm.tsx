"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskPriority } from "@prisma/client";
import { useTaskSelectPriorities } from "@/types/task";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "task.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "task.validations.description.required",
  }),
  priority: z.nativeEnum(TaskPriority, {
    required_error: "task.validations.priority.required",
    message: "task.validations.priority.invalid",
  }),
  estimatedTime: z.coerce.number().min(0, {
    message: "task.validations.estimatedTime.invalid",
  }),
});

interface TaskFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  title: string;
  trigger: React.ReactElement;
}

function TaskForm({ initialValues, onSubmit, title, trigger }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const priorityOptions = useTaskSelectPriorities();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    form.reset(values);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset(initialValues);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Podaj nazwę"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="resize-none"
                      placeholder="Podaj opis"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Priorytet
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Wybierz priorytet"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Przewidywany czas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Podaj przewidywany czas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Zapisz</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { TaskForm, formSchema };
