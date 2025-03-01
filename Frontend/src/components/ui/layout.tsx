import { Bell, LayoutDashboard, Users, GraduationCap, Bus, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";  // Use Link from react-router-dom

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Teachers", href: "/teachers", icon: GraduationCap },
  { name: "Classes", href: "/classes", icon: Calendar },
  { name: "Buses", href: "/buses", icon: Bus },
  { name: "Messages", href: "/messages", icon: MessageSquare },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">EduAdmin</h1>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}  // Use 'to' instead of 'href'
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <div className="flex-1 flex items-center">
            <input type="search" placeholder="Search..." className=" px-1 rounded-md bg-gray-100" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
