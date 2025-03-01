import { useEffect, useState } from "react";
import { Edit, Search, Trash } from "lucide-react";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  organization: {
    name: string;
  };
}

interface Props {
  admins: IUser[];
}

export function AdminList({ admins }: Props) { // Fixed destructuring
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2; // Updated per your request
  const [totalPages, setTotalPages] = useState<number>(1);

  // Calculate total pages when admins change
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(admins.length / itemsPerPage);
    setTotalPages(calculatedTotalPages);
    // Reset to first page if currentPage exceeds new totalPages
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [admins, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log(`Changing to page ${newPage}`);
      setCurrentPage(newPage);
    }
  };

  // Paginate the admins array
  const paginatedAdmins = admins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Header with Search */}
      <div className="table-header flex justify-between items-center">
        <h2 className="list-header">Admins</h2>
        <div className="search-box-container">
          <Search className="search-icon" />
          <input type="search" placeholder="Search..." className="search-box" />
        </div>
      </div>

      {/* Table */}
      {admins.length > 0 ? (
        <table className="modern-table w-full">
          <thead className="table-header">
            <tr>
              <th className="text-left py-2 px-4 font-semibold">#</th>
              <th className="text-left py-2 px-4 font-semibold">Name</th>
              <th className="text-left py-2 px-4 font-semibold">Email</th>
              <th className="text-left py-2 px-4 font-semibold">Organization</th>
              <th className="text-center py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedAdmins.map((admin, index) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="py-2 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4">{admin.fullName}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.organization.name}</td>
                <td className="py-2 px-4 text-center flex justify-center space-x-2">
                  <button className="p-1">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </button>
                  <button className="p-1">
                    <Trash className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-4">No admins found.</p>
      )}

      {/* Pagination Controls */}
      {admins.length > 0 && (
        <div className="pagination-container flex justify-center space-x-2 mt-4">
          <button
            className={`pagination-btn ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                currentPage === index + 1 ? "bg-gray-300" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`pagination-btn ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}