import { useState, useCallback } from 'react';
import { Issue, IssueFormData, Status } from '@/types/issue';
import { toast } from 'sonner';

// Demo data for initial state
const DEMO_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Fix login button not responding on mobile',
    description: 'The login button on the mobile view is not triggering the authentication flow. Users are unable to log in from their phones.',
    priority: 'high',
    status: 'open',
    assignedTo: 'john@example.com',
    createdBy: 'admin@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'Add dark mode toggle to settings',
    description: 'Users have requested a dark mode option in the settings panel. This should persist across sessions.',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'jane@example.com',
    createdBy: 'admin@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: '3',
    title: 'Update documentation for API v2',
    description: 'The API documentation needs to be updated to reflect the changes in version 2. Include new endpoints and deprecation notices.',
    priority: 'low',
    status: 'done',
    assignedTo: 'docs@example.com',
    createdBy: 'admin@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export function useIssues(userEmail: string) {
  const [issues, setIssues] = useState<Issue[]>(DEMO_ISSUES);

  const createIssue = useCallback((data: IssueFormData) => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      ...data,
      status: 'open',
      createdBy: userEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setIssues(prev => [newIssue, ...prev]);
    toast.success('Issue created successfully');
  }, [userEmail]);

  const updateStatus = useCallback((id: string, status: Status) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id 
        ? { ...issue, status, updatedAt: new Date() }
        : issue
    ));
    toast.success('Status updated');
  }, []);

  return { issues, createIssue, updateStatus };
}
