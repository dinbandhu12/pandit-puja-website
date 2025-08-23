import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, User, Eye, EyeOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    // Simple frontend authentication - no backend call needed
    if (username === 'website-admin' && password === 'website-admin') {
      // Simulate a small delay for better UX
      setTimeout(() => {
        toast.success('Login successful!');
        // Store admin status in localStorage
        localStorage.setItem('isAdmin', 'true');
        // Redirect to admin dashboard
        navigate('/admin-blog-page');
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
      toast.error('Invalid credentials. Use website-admin/website-admin');
    }
  };

  const clearAdminStatus = () => {
    localStorage.removeItem('isAdmin');
    toast.success('Admin status cleared. You can now login again.');
  };

  const checkAdminStatus = () => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      toast.info('You are currently logged in as admin. Redirecting to dashboard...');
      setTimeout(() => navigate('/admin-blog-page'), 1000);
    } else {
      toast.info('You are not logged in as admin.');
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Sign In</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                Restricted Access
              </Badge>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full gradient-sacred hover-sacred"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Back to Blog Link */}
              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/blog')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ← Back to Blog
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Status Checker */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-3">Admin Status Checker</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={checkAdminStatus}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAdminStatus}
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                Clear Status
              </Button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="font-medium text-foreground mb-2">Admin Credentials</h3>
            <p className="text-sm text-muted-foreground">
              Username: <code className="bg-background px-1 rounded">website-admin</code><br />
              Password: <code className="bg-background px-1 rounded">website-admin</code>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This is a simple frontend authentication. No backend calls are made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

