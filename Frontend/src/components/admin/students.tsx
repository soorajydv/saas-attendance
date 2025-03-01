import { Users, GraduationCap, Bus, Calendar, Edit, Trash } from "lucide-react";
import "@/styles/admin/dashboard.css";

export function DashboardContent() {
  const stats = [
    {
      id: 1,
      title: "Teachers",
      count: 42,
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      bgColor: "bg-blue-100",
      list: ["John Doe", "Jane Smith", "Mark Johnson"],
    },
    {
      id: 2,
      title: "Students",
      count: 350,
      icon: <Users className="h-8 w-8 text-green-500" />,
      bgColor: "bg-green-100",
      list: ["Alice Brown", "Bob White", "Charlie Black"],
    },
    {
      id: 3,
      title: "Buses",
      count: 8,
      icon: <Bus className="h-8 w-8 text-yellow-500" />,
      bgColor: "bg-yellow-100",
      list: ["Bus 101", "Bus 102", "Bus 103"],
    },
    {
      id: 4,
      title: "Classes",
      count: 16,
      icon: <Calendar className="h-8 w-8 text-purple-500" />,
      bgColor: "bg-purple-100",
      list: ["Class 1A", "Class 1B", "Class 1C"],
    },
  ];

  return (
    <div className="dashboard-content p-4">
      {/* Cards Section */}
      <div className="card-section grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`card flex items-center p-4 rounded-lg shadow-md ${stat.bgColor}`}
          >
            <div className="icon-container p-2 rounded-full bg-white shadow-md">
              {stat.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* List Section */}
      <div className="list-section mt-10">
        {stats.map((stat) => (
          <div key={stat.id} className="list-container mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
    <span className="mr-2" style={{ marginTop: '2px' }}>
      {stat.icon}
    </span>
    {stat.title} List
  </h3>
            <ul className="bg-white rounded-lg shadow-md p-4 divide-y divide-gray-200">
              {stat.list.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span>{item}</span>
                  <div>
                  <button className="p-2 bg-blue-500 text-blue rounded-full 
                  hover:bg-blue-600 focus:outline-none focus:ring-2 
                  focus:ring-blue-400 transition duration-300">
                    <Edit className="h-6 w-6" />
                  </button>

                  <button className="p-2 bg-red-500 text-red rounded-full 
                  hover:bg-red-600 focus:outline-none focus:ring-2 
                  focus:ring-red-400 transition duration-300">
                    <Trash className="h-6 w-6" />
                  </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
