import SignUp from "@/components/auth/signUp";
 import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
 import React from "react";
 
 const SignupPage = () => {
   const breadcrumbItems = [
     {
       label: "Zarejestruj się",
     },
   ];
   return (
     <>
       <PageBreadcrumb items={breadcrumbItems} />
       <div className="flex justify-center">
         <SignUp />
       </div>
     </>
   );
 };
 
 export default SignupPage;