export interface ITeamMember {
  _id: string;
  name: string;
  title: string;
  role?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface ISubTask {
  _id: string;
  title: string;
  date: string;
  tag: string;
}

export interface IActivity {
  type:
    | "commented"
    | "started"
    | "assigned"
    | "bug"
    | "completed"
    | "in_progress";
  activity: string;
  date: string;
  by: { _id: string; name: string };
  _id: string;
}

export interface ITask {
  _id: string;
  title: string;
  date: string;
  priority: "high" | "medium" | "low";
  stage: "todo" | "in_progress" | "completed";
  team: ITeamMember[];
  isTrashed: boolean;
  activities: IActivity[]; // Define a specific type if you know it
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  title: string;
  role: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
}

export interface IChartData {
  name: string;
  total: number;
}
