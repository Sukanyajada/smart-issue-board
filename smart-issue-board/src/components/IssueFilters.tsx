import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Priority, Status } from '@/types/issue';

interface IssueFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: Status | 'all';
  onStatusFilterChange: (status: Status | 'all') => void;
  priorityFilter: Priority | 'all';
  onPriorityFilterChange: (priority: Priority | 'all') => void;
}

export function IssueFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: IssueFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card/50 rounded-lg border border-border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search issues..."
          className="pl-9 bg-secondary/50"
        />
      </div>
      
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={statusFilter} onValueChange={(v) => onStatusFilterChange(v as Status | 'all')}>
            <SelectTrigger className="w-[140px] bg-secondary/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select value={priorityFilter} onValueChange={(v) => onPriorityFilterChange(v as Priority | 'all')}>
          <SelectTrigger className="w-[140px] bg-secondary/50">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
