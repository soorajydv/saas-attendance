import { Edit, Trash, Phone, UserCircle } from "lucide-react";
import "@/styles/admin/dashboard.css";
import { TeacherList } from "./teachersList";

export function ManageTeachers() {
  const teachers = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      avatar: "https://i.pravatar.cc/150?img=3", // Replace with actual image URL
      status: "Present",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+0987654321",
      avatar: "https://i.pravatar.cc/150?img=3", // Replace with actual image URL
      status: "Absent",
    },
    {
      id: 3,
      name: "Mark Johnson",
      phone: "+1122334455",
      avatar: "https://i.pravatar.cc/150?img=3", // Replace with actual image URL
      status: "Present",
    },
  ];

  const presentCount = teachers.filter((teacher) => teacher.status === "Present").length;
  const absentCount = teachers.length - presentCount;

  return (
    <div className="dashboard-content p-4">
      {/* Card Section */}
      <div className="card-section grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card flex items-center p-4 rounded-lg shadow-md bg-green-100">
          <div className="icon-container p-2 rounded-full bg-white shadow-md">
            <UserCircle className="h-8 w-8 text-green-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Present</h3>
            <p className="text-2xl font-bold">{presentCount}</p>
          </div>
        </div>
        <div className="card flex items-center p-4 rounded-lg shadow-md bg-red-100">
          <div className="icon-container p-2 rounded-full bg-white shadow-md">
            <UserCircle className="h-8 w-8 text-red-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Absent</h3>
            <p className="text-2xl font-bold">{absentCount}</p>
          </div>
        </div>
      </div>

      {/* List Section */}
      <TeacherList />
    </div>
  );
}
