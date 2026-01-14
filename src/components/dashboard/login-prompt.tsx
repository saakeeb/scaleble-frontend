import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Lock } from 'lucide-react';
import Link from 'next/link';

export function LoginPrompt() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Lock className="h-10 w-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Login Required</CardTitle>
        <CardDescription className="text-base">
          Please sign in to view the dashboard data and access all features
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Link href="/login" className="w-full max-w-xs">
          <Button className="w-full" size="lg">
            <LogIn className="mr-2 h-5 w-5" />
            Login to Continue
          </Button>
        </Link>

        <div className="mt-4 p-4 bg-muted rounded-lg w-full">
          <p className="text-sm text-muted-foreground mb-3 font-medium">Demo Credentials:</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Admin:</span>
              <code className="bg-background px-2 py-1 rounded">admin@example.com / admin123</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">User:</span>
              <code className="bg-background px-2 py-1 rounded">user@example.com / user123</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
