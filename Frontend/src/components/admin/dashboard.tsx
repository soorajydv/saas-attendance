// DashboardContent.tsx
import { CardSection } from "./cardSection";
import { ListSection } from "./listSection";

export function DashboardContent() {
  return (
    <div className="dashboard-content p-4">
      {/* Cards Section */}
      <CardSection />

      {/* List Section */}
      <ListSection />
    </div>
  );
}
