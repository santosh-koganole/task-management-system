import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineCreate,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import UserInfo from "../UserInfo";
import Button from "../Button";
import { ITask, ITeamMember } from "../../Interfaces";
import ConfirmationDialog from "../ConfirmationDialog";
import { SetStateAction, useState } from "react";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
export interface ITableProps {
  tasks: ITask[];
}
interface ITableRowProps {
  task: ITask;
}
const Table: React.FC<ITableProps> = ({ tasks }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isAdmin } = user; // Destructuring multiple properties
  const filteredTasks = tasks.filter((task) =>
    task.team.some((member) => member._id === user._id)
  );
  tasks = isAdmin ? tasks : filteredTasks;
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState<ITask | null | string>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteTask] = useTrashTaskMutation();

  const deleteClicks = (id: string) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el: SetStateAction<ITask | null | string>) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black  text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2 line-clamp-1">Created At</th>

        <th className="py-2">Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }: ITableRowProps) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1">
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className="py-2">
        <div className="flex">
          {task?.team?.map((m: ITeamMember, index: number) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      {isAdmin && (
        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          <Button
            icon={<MdOutlineCreate className="text-xl text-blue-600" />}
            type="button"
            onClick={() => editTaskHandler(task)}
          />

          <Button
            icon={<MdDelete className="text-xl text-red-600" />}
            type="button"
            onClick={() => deleteClicks(task._id)}
          />
        </td>
      )}
    </tr>
  );
  return (
    <>
      <div className="bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-visible relative">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {tasks.map((task, index: number) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Table;
