import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, AlertTriangle } from 'lucide-react';
import { Issue, IssueFormData, Priority } from '@/types/issue';

interface CreateIssueDialogProps {
  issues: Issue[];
  onCreateIssue: (data: IssueFormData) => void;
}

function findSimilarIssues(title: string, description: string, issues: Issue[]): Issue[] {
  const searchText = `${title} ${description}`.toLowerCase();
  const words = searchText.split(/\s+/).filter(word => word.length > 3);
  
  return issues.filter(issue => {
    const issueText = `${issue.title} ${issue.description}`.toLowerCase();
    const matchCount = words.filter(word => issueText.includes(word)).length;
    return matchCount >= Math.min(2, words.length * 0.3);
  }).slice(0, 3);
}

export function CreateIssueDialog({ issues, onCreateIssue }: CreateIssueDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [similarIssues, setSimilarIssues] = useState<Issue[]>([]);
  const [showSimilarWarning, setShowSimilarWarning] = useState(false);

  const checkSimilarIssues = () => {
    const similar = findSimilarIssues(title, description, issues);
    setSimilarIssues(similar);
    return similar.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showSimilarWarning) {
      const hasSimilar = checkSimilarIssues();
      if (hasSimilar) {
        setShowSimilarWarning(true);
        return;
      }
    }

    onCreateIssue({ title, description, priority, assignedTo });
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignedTo('');
    setSimilarIssues([]);
    setShowSimilarWarning(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue"
              className="bg-secondary/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed explanation of the issue..."
              className="bg-secondary/50 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Email or name"
                className="bg-secondary/50"
              />
            </div>
          </div>

          {showSimilarWarning && similarIssues.length > 0 && (
            <Alert className="border-warning/50 bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-sm">
                <p className="font-medium text-warning mb-2">Similar issues found:</p>
                <ul className="space-y-1 text-muted-foreground">
                  {similarIssues.map(issue => (
                    <li key={issue.id} className="truncate">
                      • {issue.title}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Click "Create Issue" again to confirm creation.
                </p>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {showSimilarWarning ? 'Create Anyway' : 'Create Issue'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
