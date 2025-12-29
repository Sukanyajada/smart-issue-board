import { useState } from 'react';
import { Header } from '@/components/Header';
import { IssueList } from '@/components/IssueList';
import { useIssues } from '@/hooks/useIssues';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  const { issues, createIssue, updateStatus } = useIssues(userEmail);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (authPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    // Demo auth - in production, this would use Supabase
    setUserEmail(authEmail);
    setIsAuthenticated(true);
    toast.success(authTab === 'login' ? 'Welcome back!' : 'Account created successfully!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setAuthEmail('');
    setAuthPassword('');
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 glow mb-4">
              <LayoutGrid className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Smart Issue Board</h1>
            <p className="text-muted-foreground">Track and manage issues efficiently</p>
          </div>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl">
                {authTab === 'login' ? 'Welcome back' : 'Create an account'}
              </CardTitle>
              <CardDescription>
                {authTab === 'login' 
                  ? 'Enter your credentials to access your issues' 
                  : 'Enter your details to get started'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as 'login' | 'signup')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-9 bg-secondary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 bg-secondary/50"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    {authTab === 'login' ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Demo mode: Any email/password (6+ chars) works
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userEmail={userEmail} onLogout={handleLogout} />
      <main className="container py-8">
        <IssueList 
          issues={issues} 
          onCreateIssue={createIssue}
          onStatusChange={updateStatus}
        />
      </main>
    </div>
  );
}
