import { Edit, Trash } from "lucide-react";

export function TeacherList() {
  return (
    <div className="table w-[35rem] mt-10 flex flex-wrap gap-6">
      <div className="table-header w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="list-header text-2xl font-semibold text-gray-800 p-[.5rem]">Teacher</h2>
          <table className="modern-table w-full">
            <thead className="table-header">
              <tr>
                <th className="text-left py-2 px-4 font-semibold">#</th>
                <th className="text-left py-2 px-4 font-semibold">Name</th>
                <th className="text-left py-2 px-4 font-semibold">Email</th>
                <th className="text-center py-2 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              <tr className="entry hover:bg-gray-50" style={{ height: "4rem" }}>
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">johndoe@example.com</td>
                <td className="py-2 px-4 text-center flex justify-center space-x-2">
                  <button className="p-1">
                    <Edit className="h-4 w-4" style={{ color: "blue" }} />
                  </button>
                  <button className="p-1">
                    <Trash className="h-4 w-4" style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  );
}
