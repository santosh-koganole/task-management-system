import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdTaskAlt,
  MdOutlinePendingActions,
  MdOutlineAddTask,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { ReactNode } from "react";

interface ILinkItemProps {
  label: string;
  link: string;
  icon: ReactNode;
}
const linkData: ILinkItemProps[] = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "In Progress",
    link: "in-progress/in_progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];
const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin
    ? linkData
    : linkData.filter((item) => !["Team", "Trash"].includes(item.label));

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ label, link, icon }: ILinkItemProps) => {
    return (
      <Link
        to={link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2565ed2d]",
          path === link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {icon} <span className="hover:text-[#2564ed]">{label}</span>
      </Link>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1
        className="flex gap-1 items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">My Tasks</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink {...link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
