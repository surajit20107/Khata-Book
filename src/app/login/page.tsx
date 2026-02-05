"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message);
      }
      
      if (res.status === 200) {
        setFormData({
          email: "",
          password: "",
        });
        router.push("/")
      }
      setLoading(false)
    } catch (error) {
      setError((error as Error).message);
      setLoading(false)
    }
  };

  return (
    <div className="mt-8 md:mt-20">
      <h1 className="text-center font-semibold text-xl md:text-5xl">
        Welcome back to Apna Hisab
      </h1>
      <div className="form-container mt-8 px-4 border border-zinc-300 m-4 rounded-lg shadow-md shadow-zinc-300 py-8">
        <h2 className="text-center font-semibold text-lg md:text-4xl">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 mx-auto md:mx-16">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
              placeholder="name@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900  focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center md:text-2xl md:font-semibold md:mt-8 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm font-medium text-grey-900 md:text-2xl md:font-semibold md:mb-8">
          Don't have account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Create New
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
