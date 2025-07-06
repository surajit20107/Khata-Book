"use client"
import Link from "next/link"
import { IoLogInOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuthStore } from "@/stores/userAuthStore";

const Header = () => {
  const { isLoggedIn, login, logout } = useUserAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login();
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    logout();
    router.push("/login")
  }
  
  return (
    <div>
      <nav className="bg-zinc-700 text-white px-4 h-14 flex justify-between items-center md:h-20 md:px-8">
        <div>
          <Link href="/">
            <h1 className="text-lg font-semibold md:text-2xl">Expense Tracker</h1>
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
      <button onClick={handleLogout}
            className="flex items-center gap-1 text-lg md:text-xl md:font-semibold">
            <TbLogout2
              className="text-xl md:text-4xl"
              />
            Logout
          </button>
          ) : (
            <Link 
            className="flex items-center gap-1 text-lg md:text-xl md:font-semibold"
            href="/login">
            <IoLogInOutline
              className="text-2xl md:text-4xl"
              />
            Login
          </Link>
          )}
          
        </div>
      </nav>
    </div>
  )
}

export default Header