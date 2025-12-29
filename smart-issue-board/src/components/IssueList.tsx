import { useMemo, useState } from 'react';
import { Issue, Priority, Status, IssueFormData } from '@/types/issue';
import { IssueCard } from './IssueCard';
import { IssueFilters } from './IssueFilters';
import { CreateIssueDialog } from './CreateIssueDialog';
import { Inbox } from 'lucide-react';

interface IssueListProps {
  issues: Issue[];
  onCreateIssue: (data: IssueFormData) => void;
  onStatusChange: (id: string, status: Status) => void;
}

export function IssueList({ issues, onCreateIssue, onStatusChange }: IssueListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const filteredIssues = useMemo(() => {
    return issues
      .filter(issue => {
        const matchesSearch = searchQuery === '' || 
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [issues, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Issues</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredIssues.length} of {issues.length} issues
          </p>
        </div>
        <CreateIssueDialog issues={issues} onCreateIssue={onCreateIssue} />
      </div>

      <IssueFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />

      {filteredIssues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-secondary/50 mb-4">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No issues found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {issues.length === 0 
              ? 'Create your first issue to get started'
              : 'Try adjusting your filters'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map(issue => (
            <IssueCard 
              key={issue.id} 
              issue={issue} 
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
