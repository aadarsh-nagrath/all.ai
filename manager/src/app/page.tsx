'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Package } from 'lucide-react';

// Get credentials from env (using NEXT_PUBLIC_* for client-side)
const USER_ID = process.env.NEXT_PUBLIC_CONTROLLER_ID || '';
const USER_PASS = process.env.NEXT_PUBLIC_CONTROLLER_PASSWORD || '';

function MongoStatusButton() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setConnected(data.connected);
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={checkStatus}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
          >
            <span
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                loading ? 'bg-gray-400 animate-pulse' : connected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              MongoDB
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {connected === null ? 'Checking MongoDB...' : connected ? 'MongoDB Connected' : 'MongoDB Disconnected'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function AddModelsPage() {
  const [showModal, setShowModal] = useState(true);
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState<'models' | 'user'>('models');
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [models, setModels] = useState<any[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState('');
  const [addModelLoading, setAddModelLoading] = useState(false);
  const [addModelError, setAddModelError] = useState('');
  const [addModelSuccess, setAddModelSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === USER_ID && pass === USER_PASS) {
      setShowModal(false);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddModelLoading(true);
    setAddModelError('');
    setAddModelSuccess('');
    try {
      const res = await fetch('/api/models/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_name: modelName,
          short_description: modelDescription,
        }),
      });
      if (res.ok) {
        setAddModelSuccess('Model added successfully!');
        setModelName('');
        setModelDescription('');
        fetch('/api/models/list')
          .then(res => res.json())
          .then(data => setModels(Array.isArray(data) ? data : []));
      } else {
        setAddModelError('Failed to add model');
      }
    } catch {
      setAddModelError('Failed to add model');
    } finally {
      setAddModelLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === 'user') {
      setUsersLoading(true);
      setUsersError('');
      fetch('/api/user/list')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            setUsers([]);
            setUsersError('Failed to load users');
          }
        })
        .catch(() => setUsersError('Failed to load users'))
        .finally(() => setUsersLoading(false));
    }
  }, [activePage]);

  useEffect(() => {
    if (activePage === 'models') {
      setModelsLoading(true);
      setModelsError('');
      fetch('/api/models/list')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setModels(data);
          } else {
            setModels([]);
            setModelsError('Failed to load models');
          }
        })
        .catch(() => setModelsError('Failed to load models'))
        .finally(() => setModelsLoading(false));
    }
  }, [activePage]);

  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="ID"
                value={id}
                onChange={e => setId(e.target.value)}
                autoFocus
              />
              <Input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Manager Dashboard</h2>
        <nav className="space-y-2">
          <Button
            variant={activePage === 'models' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activePage === 'models' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-800'}`}
            onClick={() => setActivePage('models')}
          >
            <Package className="mr-2 h-4 w-4" /> Models
          </Button>
          <Button
            variant={activePage === 'user' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activePage === 'user' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-800'}`}
            onClick={() => setActivePage('user')}
          >
            <User className="mr-2 h-4 w-4" /> Users
          </Button>
          <Separator className="my-4" />
          <Button
            variant="destructive"
            className="w-full justify-start hover:bg-red-600"
            onClick={() => setShowModal(true)}
          >
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto relative">
        <MongoStatusButton />
        {activePage === 'models' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white dark:bg-gray-900 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Add New Model</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddModel} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Model Name
                    </label>
                    <Input
                      type="text"
                      value={modelName}
                      onChange={e => setModelName(e.target.value)}
                      placeholder="Enter model name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Model Description
                    </label>
                    <Textarea
                      value={modelDescription}
                      onChange={e => setModelDescription(e.target.value)}
                      placeholder="Enter model description"
                      rows={4}
                    />
                  </div>
                  {addModelError && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{addModelError}</AlertDescription>
                    </Alert>
                  )}
                  {addModelSuccess && (
                    <Alert variant="default" className="border-green-500">
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>{addModelSuccess}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={addModelLoading}>
                    {addModelLoading ? 'Adding...' : 'Add Model'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">All Models</h2>
            {modelsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-lg" />
                ))}
              </div>
            )}
            {modelsError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{modelsError}</AlertDescription>
              </Alert>
            )}
            {!modelsLoading && !modelsError && models.length > 0 && (
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {models.map(model => (
                    <Card key={model._id} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {model.model_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {model.short_description || 'No description provided'}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          ID: {model._id}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
            {!modelsLoading && !modelsError && models.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No models found. Add your first model above!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activePage === 'user' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white dark:bg-gray-900 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Manage user accounts, permissions, and settings.
                </p>
              </CardContent>
            </Card>

            {usersLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-lg" />
                ))}
              </div>
            )}
            {usersError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{usersError}</AlertDescription>
              </Alert>
            )}
            {!usersLoading && !usersError && users.length > 0 && (
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map(user => (
                    <Card key={user._id} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {user.image ? (
                              <AvatarImage src={user.image} alt={user.name} />
                            ) : (
                              <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                            )}
                          </Avatar>
                          <CardTitle className="text-lg">{user.name || 'Unknown User'}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          Email: {user.email || 'N/A'}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          ID: {user._id}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
            {!usersLoading && !usersError && users.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No users found. Invite your first user!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}