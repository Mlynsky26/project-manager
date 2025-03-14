import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-4 mt-3">Oops! Page not found.</p>
      <Link href="/" className="btn btn-primary mt-4">
        Go back home
      </Link>
    </div>
  );
}
