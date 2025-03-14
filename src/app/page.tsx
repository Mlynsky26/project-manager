import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Your Project Manager</h1>
      <p className="lead">Easily track, organize, and manage your projects efficiently.</p>
      <Link href="/projects" className="btn btn-primary">Get Started</Link>
    </div>
  );
};

export default HomePage;
