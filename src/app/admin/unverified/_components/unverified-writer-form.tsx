import { UnverifiedWriterColumns, columns } from "./columns";
import { DataTable } from "@/components/custom/data-table";

interface UnverifiedWriterFormProps {
  initialData: UnverifiedWriterColumns[];
}

export const UnverifiedWriterForm: React.FC<UnverifiedWriterFormProps> = ({
  initialData,
}) => {
  return (
    <div>
      <DataTable searchKey="email" columns={columns} data={initialData} />
    </div>
  );
};
