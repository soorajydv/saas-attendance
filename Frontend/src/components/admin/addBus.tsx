import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export function AddBusForm() {
  const [busDetails, setBusDetails] = useState({
    busNumber: "",
    route: "",
    capacity: "",
    driverId: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Posting the data to the backend
    try {
      console.log(BACKEND_URL);
      
      const response = await fetch(`${BACKEND_URL}/admin/bus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busDetails),
      });

      if (response.ok) {
        // Handle success (you can reset form, show a success message, etc.)
        alert("Bus added successfully");
      } else {
        const data = await response.json();
        // Handle error
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("Error posting bus details:", error);
      alert("An error occurred");
    }
  };

  
  return (
<div className="flex justify-around ml-10">
      <div className="h-[20rem] w-[20rem] bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add Bus Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="busNumber"
            >
              Bus Number
            </label>
            <input
              type="text"
              name="busNumber"
              id="busNumber"
              value={busDetails.busNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="route"
            >
              Route
            </label>
            <input
              type="text"
              name="route"
              id="route"
              value={busDetails.route}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="capacity"
            >
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              value={busDetails.capacity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="driverId"
            >
              Driver ID
            </label>
            <input
              type="text"
              name="driverId"
              id="driverId"
              value={busDetails.driverId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-between mt-[1rem]">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Add Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
