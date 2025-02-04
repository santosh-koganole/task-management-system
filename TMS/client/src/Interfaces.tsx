export interface ITeamMember {
  _id: string;
  name: string;
  title: string;
  email: string;
}

export interface ISubTask {
  _id: string;
  title: string;
  date: string;
  tag: string;
}

export interface ITask {
  _id: string;
  title: string;
  date: string;
  priority: "high" | "medium" | "low";
  stage: "todo" | "in_progress" | "completed";
  assets: []; // Define a specific type if you know it
  team: ITeamMember[];
  isTrashed: boolean;
  activities: []; // Define a specific type if you know it
  subTasks: ISubTask[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  email: string;
  _id: string;
  name: string;
  title: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
