import clsx from "clsx";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import UserInfo from "./UserInfo";
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

          {/* {user?.isAdmin && <TaskDialog task={task} />} */}
          <TaskDialog task={task} />
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

        <>
          <div className="py-3 border-t border-gray-200">
            <span className="text-gray-500">No Sub Task</span>
          </div>
        </>
      </div>
    </>
  );
};

export default TaskCard;
