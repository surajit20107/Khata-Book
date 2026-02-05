"use client"
import Link from "next/link"
import { IoLogInOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
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
      </nav>
    </div>
  )
}

export default Header