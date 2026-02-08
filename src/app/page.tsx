"use client";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { apiFetch } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";

interface Records {
  _id: string;
  name: string;
  amount: number;
  description: string;
  type: string;
  date: string;
}

const Tracks = () => {
  const [records, setRecords] = useState<Records[]>([]);

  const getRecords = async () => {
    const res = await apiFetch("/api/v1/hisab", "GET");
    if (res && res.data) {
      setRecords(res.data);
    } else if (res && !res.success) {
      toast.error(res.message || "Failed to fetch records");
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap gap-4 px-6 justify-between md:px-18">
        <div className="mt-2 w-full">
          <h1 className="text-2xl font-bold text-center">Tracks</h1>
        </div>
        <div className="w-full flex justify-end">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 font-semibold text-blue-500"
          >
            <IoIosAddCircle />
            Record
          </Link>
        </div>

        {records.map((record) => {
          return (
            <div
              key={record?._id}
              className="w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md shadow-zinc-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {record?.name}
              </h5>

              <p className="mb-2 text-md font-semibold text-gray-900 dark:text-white">
                <strong>
                  &#8377;{" "}
                  {new Intl.NumberFormat("en-US").format(record?.amount)}
                </strong>
              </p>

              <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                {record?.description}
              </p>

              <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-400">
                Type: {record?.type}
              </p>

              {/* the date */}
              <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-400">
                <strong>
                  Date:{" "}
                  {
                    new Date(record?.date)
                      .toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      .split("T")[0]
                  }
                </strong>
              </p>

              <button
                onClick={() => alert(record?._id)}
                className="inline-flex items-center gap-1 px-2 py-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <MdDelete /> Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracks;
