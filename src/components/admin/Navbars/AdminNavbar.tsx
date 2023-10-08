import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="absolute top-0 z-10 w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center px-4 py-8">
      <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <Link
          className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          href="/admin"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
