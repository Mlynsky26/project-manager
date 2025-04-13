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
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import Project from "@/types/project";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "project.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "project.validations.description.required",
  }),
});

interface ProjectFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  title: string;
  trigger: React.ReactElement;
  project?: Partial<Project>;
}

function ProjectForm({
  initialValues = { name: "", description: "" },
  onSubmit,
  title,
  trigger,
}: ProjectFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset(initialValues);
    }
    setOpen(newOpen);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    setOpen(false);
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
            <Button type="submit">Zapisz</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { ProjectForm, formSchema };
