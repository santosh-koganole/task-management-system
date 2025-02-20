import { useSelector } from "react-redux";
import { ITask } from "../Interfaces";
import TaskCard from "./TaskCard";
import { RootState } from "../redux/store";

interface BoardViewProps {
  tasks: ITask[];
}

const BoardView = ({ tasks }: BoardViewProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const filteredTasks = tasks.filter((task) =>
    task.team.some((member) => member._id === user._id)
  );

  tasks = user.isAdmin ? tasks : filteredTasks;
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index: number) => (
        <TaskCard
          task={{
            ...task,
            priority: task.priority as "high" | "medium" | "low",
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default BoardView;
