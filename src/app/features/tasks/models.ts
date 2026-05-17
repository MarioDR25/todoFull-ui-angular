export interface TaskRequest {
  title: string;
  description: string;
  completed: boolean;
}

export type TaskCreateRequest = Omit<TaskRequest, 'completed'>;


export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  userId: string;
}

export const MapTaskResponseToCreate = (data: TaskResponse): TaskCreateRequest => {
  return {
    title: data.title,
    description: data.description,
  };
};

export const MapTaskResponseToUpdate = (data: TaskResponse): TaskRequest => {
  return {
    title: data.title,
    description: data.description,
    completed: data.isCompleted,
  };
};
