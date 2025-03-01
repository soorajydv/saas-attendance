import {
  Users,
  GraduationCap,
  Bus,
  Calendar,
  Edit,
  Trash,
  UserCircle,
} from "lucide-react";
import "@/styles/admin/dashboard.css";
import { BusList } from "./busList";
import { AddBusForm } from "./addBus";

export function ManageBuses() {
  const stats = [
    {
      id: 3,
      title: "Buses",
      count: 8,
      icon: <Bus className="h-8 w-8 text-yellow-500" />,
      bgColor: "bg-yellow-100",
      list: ["Bus 101", "Bus 102", "Bus 103"],
    },
  ];

  return (
    <div className="dashboard-content p-4 flex flex-wrap gap-4">
      {/* Card Section and Form Section Side by Side */}
      <div className="flex w-full sm:w-1/2 lg:w-2/3 xl:w-2/3 gap-4">
        {/* Card Container */}
        <div className="card-container w-full sm:w-1/2 lg:w-2/3 xl:w-2/3">
          <div className="card-section grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="card flex items-center p-4 rounded-lg shadow-md bg-green-100">
              <div className="icon-container p-2 rounded-full bg-white shadow-md">
                <Bus
                  className="h-8 w-8 text-green-500"
                  style={{ color: "red" }}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Not Active</h3>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
            <div className="card flex items-center p-4 rounded-lg shadow-md bg-red-100">
              <div className="icon-container p-2 rounded-full bg-white shadow-md">
                <Bus
                  className="h-8 w-8 text-red-500"
                  style={{ color: "green" }}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Running</h3>
                <p className="text-2xl font-bold">10</p>
              </div>
            </div>
          </div>
          
          <div className="col-2 flex w-full">
            <div className="bus-list flex-1">
              <BusList />
            </div>
            <div className="flex-1">
              <AddBusForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
