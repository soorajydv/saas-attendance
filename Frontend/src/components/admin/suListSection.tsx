import { OrganizationList } from "./organizationsList";
import { AdminList, IUser } from "./adminsList";
import { IOrganization } from "@/types/admin/organization"; // Import IOrganization

interface Props {
  organizations: IOrganization[]; // Array of organizations
  admins: IUser[]; // Array of users/admins
}

export function SuListSection({ organizations, admins }: Props) {
  // console.log(organizations, admins); // For debugging

  return (
    <div className="flex h-[100%] w-[100%] flex-wrap gap-5 mt-1">
      <div className="flex-1 gap-5">
        <OrganizationList organizations={organizations} />
        <AdminList admins={admins} />
      </div>
    </div>
  );
}