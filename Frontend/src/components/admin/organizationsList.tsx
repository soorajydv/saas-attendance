import { useEffect, useState } from "react";
import api, { BACKEND_URL } from "@/api/api";
import {
  IOrganization,
  OrganizationStatus,
  SubscriptionPlan,
} from "@/types/admin/organization";
import "@/styles/organizationList.css";
import { Search } from "lucide-react";
import "@/styles/admin/suDashboard.css";

interface OrganizationListProps {
  organizations: IOrganization[];
}

export function OrganizationList({ organizations }: OrganizationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(organizations.length / itemsPerPage);

  const getStatusStyle = (status: OrganizationStatus) => {
    switch (status) {
      case OrganizationStatus.ACTIVE:
        return "status-active";
      case OrganizationStatus.INACTIVE:
        return "status-inactive";
      case OrganizationStatus.PENDING:
        return "status-pending";
      default:
        return "";
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Paginate Data
  const paginatedOrganizations = organizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="table w-[100%] mt-10 flex flex-wrap gap-6">
        <div className="table-header w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="header-container flex justify-between items-baseline">
            <h2 className="list-header">Organizations</h2>
            <div className="search-box-container h-[2rem] w-[3rem] border-b border-gray-200">
              <Search className="search-icon" />
              <input
                type="search"
                placeholder="Search..."
                className="search-box"
              />
            </div>
          </div>

          <table className="modern-table w-full">
            <thead className="table-header">
              <tr>
                <th className="text-left py-2 px-4 font-semibold">#</th>
                <th className="text-left py-2 px-4 font-semibold">Name</th>
                <th className="text-left py-2 px-4 font-semibold">Email</th>
                <th className="text-center py-2 px-4 font-semibold">Plan</th>
                <th className="text-center py-2 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedOrganizations.length > 0 ? (
                paginatedOrganizations.map((org, index) => (
                  <tr
                    key={org._id}
                    className="entry hover:bg-gray-50"
                    style={{ height: "4rem" }}
                  >
                    <td className="py-2 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-4">{org.name}</td>
                    <td className="py-2 px-4">{org.email}</td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`plan-btn ${
                          org.subscriptionPlan === SubscriptionPlan.FREE
                            ? "plan-free"
                            : "plan-premium"
                        }`}
                      >
                        {org.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span className={`status-btn ${getStatusStyle(org.status)}`}>
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}