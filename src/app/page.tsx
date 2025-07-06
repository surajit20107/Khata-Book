"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/tracks")
    }
  }, [])
  return (
    <div>
      <div className="my-4 md:mt-16">
        <h1 className="font-bold text-3xl text-center md:text-5xl">
          Welcome to Apna Hisab
        </h1>
      </div>
      <div>
        <p className="text-center font-semibold text-lg tracking-tight md:mt-12 md:text-3xl">
          Your personal expense tracker
        </p>
      </div>
      <div className="mt-4 border border-zinc-700 mx-2 rounded-md">
        <img
          src="/audit-amico.svg"
          alt="expenses"
          className="w-full object-cover"
        />
      </div>
      <div className="mt-8 md:mt-16">
        <p className="text-center mt-2 font-semibold md:text-3xl">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 font-bold">Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
