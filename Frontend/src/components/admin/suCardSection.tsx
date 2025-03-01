import { Users, House } from "lucide-react";

interface SuCardSectionProps {
  organizationCount: number; // The dynamic count for organizations
  adminsCount: number; // The dynamic count for users
}

export function SuCardSection({ organizationCount, adminsCount }: SuCardSectionProps) {
  const stats = [
    {
      id: 1,
      title: "Organizations",
      count: organizationCount, // Use the dynamic count
      icon: <House className="h-8 w-8 text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Users",
      count: adminsCount, // Replace with dynamic user count if available
      icon: <Users className="h-8 w-8 text-blue-500" />,
      bgColor: "bg-blue-100",
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
