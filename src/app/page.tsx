"use client";
import { MdDelete, MdEdit } from "react-icons/md";
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
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [records, setRecords] = useState<Records[]>([]);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    amount: 0,
    description: "",
    type: "",
  });

  const getRecords = async () => {
    setLoading(true);
    const res = await apiFetch("/api/v1/hisab", "GET");
    if (!res.success) {
      setLoading(false);
      toast.error(res.message);
      return;
    }
    setRecords(res.data.data);
    setLoading(false);
  };

  const deleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const res = await apiFetch("/api/v1/hisab", "DELETE", { id });
    if (!res.success) {
      toast.error(res?.message || "Something went wrong");
      return;
    }
    toast.success(res?.message || "Record deleted");
  };

  const editRecord = async (id: string) => {
    const res = await apiFetch("/api/v1/hisab", "PUT", editFormData);
    if (!res.success) {
      toast.error(res?.message || "Something went wrong");
      return;
    }
    toast.success(res?.message || "Record updated");
    records.map((record) => {
      if (record._id === id) {
        ((record.name = editFormData.name),
          (record.amount = editFormData.amount),
          (record.description = editFormData.description),
          (record.type = editFormData.type));
      }
      return record;
    });
    setEditMode(false);
  };

  useEffect(() => {
    getRecords();

    // cleanup function
    return () => {
      setRecords([]);
    };
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );

  return (
    <div>
      <ToastContainer />
      <div className={editMode ? "blur-md opacity-60 pointer-events-none" : ""}>
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

                {/* button container */}
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteRecord(record?._id)}
                    className="h-10 w-10 inline-flex items-center justify-center gap-1 px-2 py-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <MdDelete size={20} />
                  </button>

                  <button
                    onClick={() => {
                      console.log(record);
                      setEditMode(true);
                      setEditFormData({
                        id: record?._id,
                        name: record?.name,
                        amount: record?.amount,
                        description: record?.description,
                        type: record?.type,
                      });
                    }}
                    className="h-10 w-10 inline-flex items-center justify-center gap-1 px-2 py-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <MdEdit size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {editMode && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="editForm bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
            <h2 className="text-xl text-center font-bold mb-4">Edit Record</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editRecord(editFormData?.id);
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editFormData?.name || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                required
                className="px-2 py-2 border border-gray-300 rounded-lg outline-none"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={editFormData?.amount || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    amount: Number(e.target.value),
                  })
                }
                required
                className="px-2 py-2 border border-gray-300 rounded-lg outline-none"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={editFormData?.description || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                required
                className="px-2 py-2 border border-gray-300 rounded-lg outline-none"
              />
              <select
                name="type"
                value={editFormData?.type || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, type: e.target.value })
                }
                required
                className="px-2 py-2 border border-gray-300 rounded-lg outline-none"
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </select>

              <div className="mt-4 flex gap-2 justify-center">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-2 py-1 bg-red-600 text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 bg-green-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracks;
