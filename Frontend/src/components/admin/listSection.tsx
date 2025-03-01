// ListSection.tsx
import { Edit, Trash } from "lucide-react";
import { BusList } from "./busList";
import { StudentList } from "./studentList";
import { TeacherList } from "./teachersList";

export function ListSection() {
  return (
    <div className="flex h-[100%] w-[100%] flex-wrap gap-6 mt-10">
    <div className="flex-1">
      <TeacherList />
    </div>
    <div className="flex-1">
      <BusList />
    </div>
    <div className="flex-1">
      <StudentList />
    </div>
  </div>
  );
}
