import { BarLoader } from "react-spinners";

export default function Loading({ loading }: any) {
  return (
    <div className="flex items-center h-60v justify-center p-5 pb-14 gap-2.5 flex-auto">
      <BarLoader loading={loading} color="#175594" />
    </div>
  );
}
