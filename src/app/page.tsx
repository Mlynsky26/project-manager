"use client";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";

export default function Home() {
  return (
    <div>
      <PageBreadcrumb items={[]} />
      <h1 className="text-3xl font-semibold text-center mt-5">
        Zarządzaj swoimi projektami z ManageMe
      </h1>
    </div>
  );
}
