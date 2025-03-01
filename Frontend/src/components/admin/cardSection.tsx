// CardSection.tsx
import { Users, GraduationCap, Bus, Calendar } from "lucide-react";

export function CardSection() {
  const stats = [
    {
      id: 1,
      title: "Teachers",
      count: 42,
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Students",
      count: 350,
      icon: <Users className="h-8 w-8 text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Buses",
      count: 8,
      icon: <Bus className="h-8 w-8 text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Classes",
      count: 16,
      icon: <Calendar className="h-8 w-8 text-purple-500" />,
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="card-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`card flex items-center p-4 rounded-lg shadow-md ${stat.bgColor}`}
        >
          <div className="icon-container p-2 bg-white shadow-md">
            {stat.icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
