// BusList.tsx
import { Edit, Trash } from "lucide-react";

export function BusList() {
  return (
    <div className="table w-[35rem] mt-10 flex flex-wrap gap-6">
      <div className="table-header w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="list-header text-2xl font-semibold text-gray-800 p-[.5rem]">Buses</h2>
          <table className="modern-table w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4 font-semibold">#</th>
                <th className="text-left py-2 px-4 font-semibold">Bus Name</th>
                <th className="text-left py-2 px-4 font-semibold">Bus Number</th>
                <th className="text-center py-2 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="entry hover:bg-gray-100" style={{ height: "4rem" }}>
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">Bus 101</td>
                <td className="py-2 px-4">101A</td>
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
