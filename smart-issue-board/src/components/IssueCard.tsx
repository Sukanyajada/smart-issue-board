import { Issue, PRIORITY_LABELS, STATUS_LABELS, VALID_STATUS_TRANSITIONS, Status } from '@/types/issue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface IssueCardProps {
  issue: Issue;
  onStatusChange: (id: string, status: Status) => void;
}

const priorityVariants = {
  low: 'priorityLow',
  medium: 'priorityMedium',
  high: 'priorityHigh',
} as const;

const statusVariants = {
  open: 'statusOpen',
  in_progress: 'statusProgress',
  done: 'statusDone',
} as const;

const statusIcons = {
  open: AlertCircle,
  in_progress: Loader2,
  done: CheckCircle2,
};

export function IssueCard({ issue, onStatusChange }: IssueCardProps) {
  const StatusIcon = statusIcons[issue.status];
  const validTransitions = VALID_STATUS_TRANSITIONS[issue.status];

  const handleStatusChange = (newStatus: Status) => {
    if (!validTransitions.includes(newStatus)) {
      toast.error(`Cannot move directly from ${STATUS_LABELS[issue.status]} to ${STATUS_LABELS[newStatus]}. Please follow the workflow.`);
      return;
    }
    onStatusChange(issue.id, newStatus);
  };

  return (
    <Card className="group card-glow hover:border-primary/30 transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {issue.title}
          </h3>
          <Badge variant={priorityVariants[issue.priority]}>
            {PRIORITY_LABELS[issue.priority]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {issue.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{issue.assignedTo || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${issue.status === 'in_progress' ? 'animate-spin' : ''}`} 
              style={{ color: `hsl(var(--status-${issue.status === 'in_progress' ? 'progress' : issue.status}))` }} 
            />
            <Select value={issue.status} onValueChange={(value) => handleStatusChange(value as Status)}>
              <SelectTrigger className="h-8 w-[140px] text-xs border-none bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <span className="text-xs text-muted-foreground">
            by {issue.createdBy}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
