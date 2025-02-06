export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in-progress' | 'completed' | 'deferred';
    assignee: string;
  }