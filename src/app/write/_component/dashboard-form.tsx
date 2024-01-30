import { DataTable } from "@/components/custom/data-table";
import { DashboardProps, columns } from "./dashboard-columns";

interface DashboardFormProps {
  data: DashboardProps[];
}

export const DashboardForm: React.FC<DashboardFormProps> = ({
  data: initialData,
}) => {
  return (
    <div>
      <DataTable searchKey="title" columns={columns} data={initialData} />
    </div>
  );
};
