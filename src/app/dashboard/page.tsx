"use client"
import { useState } from "react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    description: "",
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/v1/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <h1 className="mt-6 text-center text-2xl font-semibold">Dashboard</h1>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
          <label 
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900  focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8">
            Name *
          </label>
          <input 
            type="text" 
            id="name" 
            placeholder="name"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
            required 
            value={formData.name}
            onChange={(e)=> setFormData({...formData, name: e.target.value})}
          />
          <label 
            htmlFor="description"
            className="mt-5 block mb-2 text-sm font-medium text-gray-900  focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="desc"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
            value={formData.description}
            onChange={(e)=> setFormData({...formData, description: e.target.value})}
          />
          <label 
            htmlFor="amount"
            className="mt-5 block mb-2 text-sm font-medium text-gray-900  focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8">
            Amount *
          </label>
          <input 
            type="number" 
            id="amount" 
            name="amount"
            placeholder="0.00"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
            required
            value={formData.amount}
            onChange={(e)=> setFormData({...formData, amount:e.target.value})}
          />
          <label htmlFor="type"
            className="mt-5 block mb-2 text-sm font-medium text-gray-900  focus:outline-blue-500 md:text-2xl md:font-semibold md:mb-4 md:mt-8">
            Type *
          </label>
          <select 
            name="type" 
            id="type"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500 md:h-18 md:text-2xl md:font-semibold"
            required
            value={formData.type}
            onChange={(e)=> setFormData({...formData, type: e.target.value})}>
            <option value="" disabled>
              Choose an option
            </option>
            <option value="send">Send</option>
            <option value="receive">Receive</option>
          </select>
          <div className="flex justify-center items-center">
            <button 
              type="submit"
              className="mt-8 w-2/4 text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center md:text-2xl md:font-semibold md:mt-8">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
