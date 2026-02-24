"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/utils";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await apiFetch("/api/v1/auth/logout", "POST", {});
    if (res.success) {
      toast.success("Logged out");
      router.push("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <nav className="bg-zinc-700 text-white px-4 h-14 flex justify-between items-center md:h-20 md:px-8">
        <div>
          <Link href="/">
            <h1 className="text-lg font-semibold md:text-2xl">
              Expense Tracker
            </h1>
          </Link>
        </div>
        {pathname === "/login" || pathname === "/register" ? null : (
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
