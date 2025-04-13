import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export async function generateMetadata() {
  return {
    title: "ManageMe",
    description: "Oops! Page not found",
  };
}

export default async function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="text-center">
        <div className="block mx-auto">
          <TbError404 className="inline-block text-red-500" size={100} />
        </div>
        <h1 className="text-3xl text-bold mb-8">Requested page not found</h1>
        <Link
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
          href="/"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
