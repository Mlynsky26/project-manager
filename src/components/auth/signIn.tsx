"use client";
 import React from "react";
 import CardWrapper from "../shared/cardWrapper";
 import FormError from "../shared/forms/formError";
 import FormSuccess from "../shared/forms/formSuccess";
 // import { FcGoogle } from "react-icons/fc";
 // import SocialButton from "./social-button";
 // import { FaGithub } from "react-icons/fa";
 import { useAuthState } from "@/hooks/useAuthState";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "../ui/form";
 import { Input } from "../ui/input";
 import { Button } from "../ui/button";
 import { signIn } from "@/lib/auth/authClient";
 import { useRouter } from "next/navigation";
 import SignInSchema from "@/helpers/zod/signInSchema";
 import { routes } from "@/lib/routes/routes";
 
 const SignIn = () => {
   const router = useRouter();
   const {
     error,
     success,
     loading,
     setSuccess,
     setError,
     setLoading,
     resetState,
   } = useAuthState();
   const form = useForm<z.infer<typeof SignInSchema>>({
     resolver: zodResolver(SignInSchema),
     defaultValues: {
       email: "",
       password: "",
     },
   });
 
   const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
     try {
       await signIn.email(
         {
           email: values.email,
           password: values.password,
         },
         {
           onResponse: () => {
             setLoading(false);
           },
           onRequest: () => {
             resetState();
             setLoading(true);
           },
           onSuccess: () => {
             setSuccess("Zalogowano pomyślnie");
             router.replace(routes.home);
           },
           onError: (ctx) => {
             setError(ctx.error.message);
           },
         }
       );
     } catch (error) {
       console.log(error);
       setError("Wystąpił błąd podczas logowania");
     }
   };
 
   return (
     <CardWrapper
       cardTitle="Logowanie"
       cardDescription="Wprowadź swoje dane logowania"
       cardFooterDescription="Nie masz konta?"
       cardFooterLink="/auth/signUp"
       cardFooterLinkTitle="Zarejestruj się"
     >
       <Form {...form}>
         <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
           <FormField
             control={form.control}
             name="email"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Email</FormLabel>
                 <FormControl>
                   <Input
                     disabled={loading}
                     type="email"
                     placeholder="example@gmail.com"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name="password"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Password</FormLabel>
                 <FormControl>
                   <Input
                     disabled={loading}
                     type="password"
                     placeholder="********"
                     {...field}
                   />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           <FormError message={error} />
           <FormSuccess message={success} />
           <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Loading..." : "Zaloguj się"}
           </Button>
         </form>
       </Form>
     </CardWrapper>
   );
 };
 
 export default SignIn;