import clsx from "clsx";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
// import AddSubTask from "./task/AddSubTask";
import { RootState } from "../redux/store";
import { ITask } from "../Interfaces";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

interface TaskCardProps {
  task: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  console.log("task", task);
  console.log("priority", task?.priority, open);

  return (
    <>
      <div className="relative overflow-visible w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <>
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className="line-clamp-1 text-black" title={task?.title}>
              {task?.title}
            </h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {formatDate(new Date(task?.date))}
            </span>
            <span>
              <div className="flex flex-row-reverse ">
                {task?.team?.map((m, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                      BGS[index % BGS?.length]
                    )}
                  >
                    <UserInfo user={m} />
                  </div>
                ))}
              </div>
            </span>
          </div>
        </>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {task?.subTasks[0].title}
            </h5>

            <div className="py-4 space-x-8">
              <span className="text-sm text-gray-600">
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium">
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="py-3 border-t border-gray-200">
              <span className="text-gray-500">No Sub Task</span>
            </div>
          </>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            disabled={user.isAdmin ? false : true}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>
      {/* 
      <AddSubTask /> */}
    </>
  );
};

export default TaskCard;
