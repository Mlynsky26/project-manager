"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useSession, updateUser } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Wymagane przynajmniej 2 znaki",
  }),
  image: z
    .string()
    .url({
      message: "Niepoprawny adres URL",
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Profile() {
  const { data, isPending } = useSession();
  const user = data?.user;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      const updatedUser = {
        name: data.name,
        image: data.image || null,
      };

      await updateUser(updatedUser);

      toast.success("Profil został zaktualizowany pomyślnie");
    } catch {
      toast.error("Nie udało się zaktualizować profilu");
    }
  };

  const breadcrumbItems = [
    {
      label: "Profil"
    },
  ];

  if (isPending) return <Spinner />;
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />
      <div className="max-w-[525px] mx-auto mt-5">
        <h1 className="text-3xl mb-5">Profil</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Podaj nazwę" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Podaj adres URL zdjęcia"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p>Rola: {user?.role}</p>

            <Button type="submit">Zapisz</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
