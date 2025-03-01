import { SuCardSection } from "./suCardSection";
import { SuListSection } from "./suListSection";

interface Props {
  organizationCount: number;
  adminsCount: number;
  organizations: any;
  admins: any;
}

export function SuDashboardContent({ organizationCount,adminsCount,organizations,admins }: Props) {
  // console.log(organizationCount,adminsCount,organizations,admins);
  
  return (
    <div className="dashboard-content p-4">
      {/* Cards Section */}
      <SuCardSection organizationCount={organizationCount} adminsCount={adminsCount} />

      {/* List Section */}
      <SuListSection organizations={organizations} admins={admins} />
    </div>
  );
}
