import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import { ITask } from "../../Interfaces";
import AddTask from "./AddTask";
import ConfirmationDialog from "../ConfirmationDialog";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TaskCardProps {
  task: ITask;
}
const TaskDialog = ({ task }: TaskCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isAdmin } = user;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const [deleteTask] = useTrashTaskMutation();

  const deleteClicks = () => {
    setOpenDialog(true);
  };
  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: task._id,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`),
      isAdmin: true,
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
      isAdmin: isAdmin,
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 ">
            <BsThreeDots />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <MenuItem
                    as="button"
                    key={el.label}
                    onClick={el.isAdmin ? el.onClick : undefined}
                    disabled={!el.isAdmin}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm 
                    ${
                      el.isAdmin
                        ? "text-gray-900 hover:bg-blue-500 hover:text-white"
                        : "text-gray-400 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {el.icon}
                    {el.label}
                  </MenuItem>
                ))}
              </div>

              <div className="px-1 py-1">
                <MenuItem
                  as="button"
                  onClick={isAdmin ? () => deleteClicks() : undefined}
                  disabled={!user.isAdmin}
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm 
                    ${
                      isAdmin
                        ? "text-red-900 hover:bg-blue-500 hover:text-white"
                        : "text-gray-400 cursor-not-allowed opacity-50"
                    }`}
                >
                  <RiDeleteBin6Line
                    className="mr-2 h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                  Delete
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
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

export default TaskDialog;
