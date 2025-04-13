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
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersStore } from "@/providers/usersProvider";
import { useTasksStore } from "@/providers/tasksProvider";
import Task from "@/types/task";
import { toast } from "sonner";
import ID from "@/types/id";
import ActionButton from "@/components/shared/elements/actionButton";
import { FaUserClock } from "react-icons/fa";
import { useState } from "react";
import { TaskStatus } from "@prisma/client";

const formSchema = z.object({
  userId: z.string().nonempty({
    message: "task.validations.assignedUser.required",
  }),
});

interface AssignUserFormProps {
  task: Task;
}

export default function AssignUserForm({ task }: AssignUserFormProps) {
  const [open, setOpen] = useState(false);
  const users = useUsersStore((state) => state.users);
  const updateTask = useTasksStore((state) => state.updateTask);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: task.assignedUserId || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const assignedUserId = values.userId as ID;
    try {
      await updateTask({
        ...task,
        assignedUserId,
        status:
          task.status == TaskStatus.PENDING
            ? TaskStatus.IN_PROGRESS
            : task.status,
        startedAt: task.startedAt ?? new Date(),
      });
      toast.success("Pomyślnie przypisano użytkownika do zadania");
      setOpen(false);
    } catch {
      toast.error("Nie udało się przypisać użytkownika do zadania");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset();
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ActionButton variant="default" tooltip="Przypisz użytkownika">
          <FaUserClock />
        </ActionButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Przypisywanie użytkownika</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Wybierz użytkownika"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.displayName || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Zapisz
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
