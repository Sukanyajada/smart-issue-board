export type Priority = 'low' | 'medium' | 'high';
export type Status = 'open' | 'in_progress' | 'done';

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueFormData {
  title: string;
  description: string;
  priority: Priority;
  assignedTo: string;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  done: 'Done',
};

export const VALID_STATUS_TRANSITIONS: Record<Status, Status[]> = {
  open: ['in_progress'],
  in_progress: ['open', 'done'],
  done: ['in_progress'],
};
