import SignIn from "@/components/auth/signIn";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import React from "react";

const SignInPage = () => {
  const breadcrumbItems = [
    {
      label: "Zaloguj się",
    },
  ];
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-center">
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
