import { MdAdminPanelSettings } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { LuClipboardPen } from "react-icons/lu";
import { FaArrowsToDot } from "react-icons/fa6";

import clsx from "clsx";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
import Chart from "../components/Chart";
import { useEffect } from "react";

const Dashboard = () => {
  const { data, isLoading, refetch } = useGetDashboardStatsQuery({});
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }
  const totals = data.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in_progress"] || 0,
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Card = ({ label, count, bg, icon }: any) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm flex flex-row justify-between items-start gap-2">
        {/* Chart by Priority */}
        <div className="w-full md:w-1/2">
          <p className="text-xl mb-4 text-gray-600 font-semibold text-center">
            Chart by Priority
          </p>
          <Chart chartData={data?.graphData} chartType="barLine" />
        </div>

        {/* Chart by Status */}
        <div className="w-full md:w-1/2">
          <p className="text-xl mb-4 text-gray-600 font-semibold text-center">
            Chart by Status
          </p>
          <Chart chartData={data?.pieChartData} chartType="pie" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
