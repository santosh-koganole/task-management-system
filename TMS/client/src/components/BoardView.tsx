import { ITask } from "../Interfaces";
import TaskCard from "./TaskCard";

interface BoardViewProps {
  tasks: ITask[];
}
const BoardView = ({ tasks }: BoardViewProps) => {
  console.log("tasks", tasks);

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
