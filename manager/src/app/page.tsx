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
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

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
  // Add state for all fields
  const [modelName, setModelName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [status, setStatus] = useState("");
  const [parameters, setParameters] = useState("");
  const [contextLength, setContextLength] = useState("");
  const [maxOutputLength, setMaxOutputLength] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [tag, setTag] = useState("");
  const [performance, setPerformance] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [cost, setCost] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [usecase, setUsecase] = useState([""]);
  const [keyFeatures, setKeyFeatures] = useState([""]);
  const [precision, setPrecision] = useState("");
  const [benchmarks, setBenchmarks] = useState([""]);
  const [modelWeightsAvailable, setModelWeightsAvailable] = useState(false);
  const [apiCompatibility, setApiCompatibility] = useState("");
  // Provider array state
  const [providers, setProviders] = useState([
    { name: "", region: "", context_length: "", latency: "", throughput: "" }
  ]);
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [models, setModels] = useState<any[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState('');
  const [addModelLoading, setAddModelLoading] = useState(false);
  const [addModelError, setAddModelError] = useState('');
  const [addModelSuccess, setAddModelSuccess] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'model' | 'user' | null>(null);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [drawerData, setDrawerData] = useState<any>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerError, setDrawerError] = useState('');
  const [addModelModalOpen, setAddModelModalOpen] = useState(false);
  // Add state for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editModelId, setEditModelId] = useState<string | null>(null);

  const openDrawer = (type: 'model' | 'user', id: string) => {
    setDrawerType(type);
    setDrawerId(id);
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (drawerOpen && drawerType && drawerId) {
      setDrawerLoading(true);
      setDrawerError('');
      setDrawerData(null);
      const url = drawerType === 'model' ? `/api/models/${drawerId}` : `/api/user/${drawerId}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.error) setDrawerError(data.error);
          else setDrawerData(data);
        })
        .catch(() => setDrawerError('Failed to fetch details'))
        .finally(() => setDrawerLoading(false));
    }
  }, [drawerOpen, drawerType, drawerId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === USER_ID && pass === USER_PASS) {
      setShowModal(false);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  // Helper functions for arrays
  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number, value: string) => {
    setter((arr: string[]) => arr.map((v, i) => (i === idx ? value : v)));
  };
  const handleAddArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((arr: string[]) => [...arr, ""]);
  };
  const handleRemoveArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number) => {
    setter((arr: string[]) => arr.filter((_, i) => i !== idx));
  };
  // Provider helpers
  const handleProviderChange = (idx: number, field: string, value: string) => {
    setProviders((arr) => arr.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };
  const handleAddProvider = () => {
    setProviders((arr) => [...arr, { name: "", region: "", context_length: "", latency: "", throughput: "" }]);
  };
  const handleRemoveProvider = (idx: number) => {
    setProviders((arr) => arr.filter((_, i) => i !== idx));
  };

  // Open modal for add or edit
  const openAddModelModal = () => {
    setEditMode(false);
    setEditModelId(null);
    // Clear all fields
    setModelName(""); setShortDescription(""); setLongDescription(""); setStatus(""); setParameters(""); setContextLength(""); setMaxOutputLength(""); setLastUpdated(""); setTag(""); setPerformance(""); setResponseTime(""); setCost(""); setSuccessRate(""); setUsecase([""]); setKeyFeatures([""]); setPrecision(""); setBenchmarks([""]); setModelWeightsAvailable(false); setApiCompatibility(""); setProviders([{ name: "", region: "", context_length: "", latency: "", throughput: "" }]);
    setAddModelModalOpen(true);
  };
  const openEditModelModal = (model: any) => {
    setEditMode(true);
    setEditModelId(model._id);
    setModelName(model.model_name || "");
    setShortDescription(model.short_description || "");
    setLongDescription(model.long_description || "");
    setStatus(model.status || "");
    setParameters(model.parameters || "");
    setContextLength(model.context_length?.toString() || "");
    setMaxOutputLength(model.max_output_length?.toString() || "");
    setLastUpdated(model.last_updated ? new Date(model.last_updated).toISOString().slice(0,10) : "");
    setTag(model.tag || "");
    setPerformance(model.Performance || "");
    setResponseTime(model.Response_Time || "");
    setCost(model.Cost || "");
    setSuccessRate(model.Success_Rate || "");
    setUsecase(Array.isArray(model.usecase) ? model.usecase : [""]);
    setKeyFeatures(Array.isArray(model.key_features) ? model.key_features : [""]);
    setPrecision(model.precision || "");
    setBenchmarks(Array.isArray(model.benchmarks) ? model.benchmarks : [""]);
    setModelWeightsAvailable(!!model.model_weights_available);
    setApiCompatibility(model.api_compatibility || "");
    setProviders(Array.isArray(model.provider) && model.provider.length > 0 ? model.provider : [{ name: "", region: "", context_length: "", latency: "", throughput: "" }]);
    setAddModelModalOpen(true);
  };

  // Update handleAddModel to handle both add and edit
  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddModelLoading(true);
    setAddModelError("");
    setAddModelSuccess("");
    try {
      let res;
      if (editMode && editModelId) {
        res = await fetch(`/api/models/${editModelId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model_name: modelName,
            provider: providers,
            status,
            parameters,
            context_length: contextLength,
            max_output_length: maxOutputLength,
            last_updated: lastUpdated ? new Date(lastUpdated) : null,
            tag,
            Performance: performance,
            Response_Time: responseTime,
            Cost: cost,
            Success_Rate: successRate,
            short_description: shortDescription,
            long_description: longDescription,
            usecase: usecase.filter(Boolean),
            key_features: keyFeatures.filter(Boolean),
            precision,
            benchmarks: benchmarks.filter(Boolean),
            model_weights_available: modelWeightsAvailable,
            api_compatibility: apiCompatibility,
          }),
        });
      } else {
        res = await fetch("/api/models/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model_name: modelName,
            provider: providers,
            status,
            parameters,
            context_length: contextLength,
            max_output_length: maxOutputLength,
            last_updated: lastUpdated ? new Date(lastUpdated) : null,
            tag,
            Performance: performance,
            Response_Time: responseTime,
            Cost: cost,
            Success_Rate: successRate,
            short_description: shortDescription,
            long_description: longDescription,
            usecase: usecase.filter(Boolean),
            key_features: keyFeatures.filter(Boolean),
            precision,
            benchmarks: benchmarks.filter(Boolean),
            model_weights_available: modelWeightsAvailable,
            api_compatibility: apiCompatibility,
          }),
        });
      }
      if (res.ok) {
        setAddModelSuccess(editMode ? "Model updated successfully!" : "Model added successfully!");
        setModelName(""); setShortDescription(""); setLongDescription(""); setStatus(""); setParameters(""); setContextLength(""); setMaxOutputLength(""); setLastUpdated(""); setTag(""); setPerformance(""); setResponseTime(""); setCost(""); setSuccessRate(""); setUsecase([""]); setKeyFeatures([""]); setPrecision(""); setBenchmarks([""]); setModelWeightsAvailable(false); setApiCompatibility(""); setProviders([{ name: "", region: "", context_length: "", latency: "", throughput: "" }]);
        fetch("/api/models/list").then(res => res.json()).then(data => setModels(Array.isArray(data) ? data : []));
        setAddModelModalOpen(false);
      } else {
        setAddModelError(editMode ? "Failed to update model" : "Failed to add model");
      }
    } catch {
      setAddModelError(editMode ? "Failed to update model" : "Failed to add model");
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
            <div className="flex justify-end mb-4">
              <Dialog open={addModelModalOpen} onOpenChange={setAddModelModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAddModelModal}>
                    Add Model
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editMode ? "Edit Model" : "Add New Model"}</DialogTitle>
                    <DialogDescription>Fill in the details to add a new model.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddModel} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Model Name</label>
                      <Input type="text" value={modelName} onChange={e => setModelName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Short Description</label>
                      <Textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} rows={2} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Long Description</label>
                      <Textarea value={longDescription} onChange={e => setLongDescription(e.target.value)} rows={4} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <Input type="text" value={status} onChange={e => setStatus(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Parameters</label>
                      <Input type="text" value={parameters} onChange={e => setParameters(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Context Length</label>
                      <Input type="number" value={contextLength} onChange={e => setContextLength(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Output Length</label>
                      <Input type="number" value={maxOutputLength} onChange={e => setMaxOutputLength(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Updated</label>
                      <Input type="date" value={lastUpdated} onChange={e => setLastUpdated(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tag</label>
                      <Input type="text" value={tag} onChange={e => setTag(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Performance</label>
                      <Input type="text" value={performance} onChange={e => setPerformance(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Response Time</label>
                      <Input type="text" value={responseTime} onChange={e => setResponseTime(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost</label>
                      <Input type="text" value={cost} onChange={e => setCost(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Success Rate</label>
                      <Input type="text" value={successRate} onChange={e => setSuccessRate(e.target.value)} />
                    </div>
                    {/* Providers */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Providers</label>
                      {providers.map((p, idx) => (
                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                          <Input placeholder="Name" value={p.name} onChange={e => handleProviderChange(idx, "name", e.target.value)} className="w-24" />
                          <Input placeholder="Region" value={p.region} onChange={e => handleProviderChange(idx, "region", e.target.value)} className="w-20" />
                          <Input placeholder="Context Length" value={p.context_length} onChange={e => handleProviderChange(idx, "context_length", e.target.value)} className="w-28" />
                          <Input placeholder="Latency" value={p.latency} onChange={e => handleProviderChange(idx, "latency", e.target.value)} className="w-20" />
                          <Input placeholder="Throughput" value={p.throughput} onChange={e => handleProviderChange(idx, "throughput", e.target.value)} className="w-28" />
                          <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveProvider(idx)} disabled={providers.length === 1}>-</Button>
                        </div>
                      ))}
                      <Button type="button" size="sm" onClick={handleAddProvider}>Add Provider</Button>
                    </div>
                    {/* Arrays */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Usecases</label>
                      {usecase.map((v, idx) => (
                        <div key={idx} className="flex gap-2 mb-1">
                          <Input value={v} onChange={e => handleArrayChange(setUsecase, idx, e.target.value)} />
                          <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveArrayItem(setUsecase, idx)} disabled={usecase.length === 1}>-</Button>
                        </div>
                      ))}
                      <Button type="button" size="sm" onClick={() => handleAddArrayItem(setUsecase)}>Add Usecase</Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Key Features</label>
                      {keyFeatures.map((v, idx) => (
                        <div key={idx} className="flex gap-2 mb-1">
                          <Input value={v} onChange={e => handleArrayChange(setKeyFeatures, idx, e.target.value)} />
                          <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveArrayItem(setKeyFeatures, idx)} disabled={keyFeatures.length === 1}>-</Button>
                        </div>
                      ))}
                      <Button type="button" size="sm" onClick={() => handleAddArrayItem(setKeyFeatures)}>Add Feature</Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Benchmarks</label>
                      {benchmarks.map((v, idx) => (
                        <div key={idx} className="flex gap-2 mb-1">
                          <Input value={v} onChange={e => handleArrayChange(setBenchmarks, idx, e.target.value)} />
                          <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveArrayItem(setBenchmarks, idx)} disabled={benchmarks.length === 1}>-</Button>
                        </div>
                      ))}
                      <Button type="button" size="sm" onClick={() => handleAddArrayItem(setBenchmarks)}>Add Benchmark</Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Precision</label>
                      <Input type="text" value={precision} onChange={e => setPrecision(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Model Weights Available</label>
                      <Switch checked={modelWeightsAvailable} onCheckedChange={setModelWeightsAvailable} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">API Compatibility</label>
                      <Input type="text" value={apiCompatibility} onChange={e => setApiCompatibility(e.target.value)} />
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
                      {addModelLoading ? (editMode ? "Saving..." : "Adding...") : (editMode ? "Save" : "Add Model")}
                    </Button>
                  </form>
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-full mt-2">Close</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>

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
                        <Button size="sm" className="mt-2 mr-2" variant="outline" onClick={() => openEditModelModal(model)}>
                          Edit
                        </Button>
                        <Button size="sm" className="mt-2" onClick={() => openDrawer('model', model._id)}>
                          View
                        </Button>
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
                        <Button size="sm" className="mt-2" onClick={() => openDrawer('user', user._id)}>
                          View
                        </Button>
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
      {/* Drawer for details */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {drawerType === 'model' ? drawerData?.model_name || 'Model Details' : drawerData?.name || 'User Details'}
            </DrawerTitle>
            <DrawerDescription>
              {drawerLoading && 'Loading...'}
              {drawerError && <span className="text-red-500">{drawerError}</span>}
              {!drawerLoading && !drawerError && drawerData && (
                <div className="text-left mt-2 space-y-2">
                  {drawerType === 'model' ? (
                    <>
                      <div><b>Description:</b> {drawerData.long_description || drawerData.short_description}</div>
                      <div><b>Status:</b> {drawerData.status}</div>
                      <div><b>Provider(s):</b> {drawerData.provider?.map((p: any, i: number) => (
                        <div key={i} className="ml-2">- {p.name} ({p.region}), Context: {p.context_length}, Latency: {p.latency}, Throughput: {p.throughput}</div>
                      ))}</div>
                      <div><b>Parameters:</b> {drawerData.parameters}</div>
                      <div><b>Context Length:</b> {drawerData.context_length}</div>
                      <div><b>Max Output Length:</b> {drawerData.max_output_length}</div>
                      <div><b>Performance:</b> {drawerData.Performance}</div>
                      <div><b>Response Time:</b> {drawerData.Response_Time}</div>
                      <div><b>Cost:</b> {drawerData.Cost}</div>
                      <div><b>Success Rate:</b> {drawerData.Success_Rate}</div>
                      <div><b>Usecases:</b> {drawerData.usecase?.join(', ')}</div>
                      <div><b>Key Features:</b> {drawerData.key_features?.join(', ')}</div>
                      <div><b>Precision:</b> {drawerData.precision}</div>
                      <div><b>Benchmarks:</b> {drawerData.benchmarks?.join(', ')}</div>
                      <div><b>Model Weights Available:</b> {drawerData.model_weights_available ? 'Yes' : 'No'}</div>
                      <div><b>API Compatibility:</b> {drawerData.api_compatibility}</div>
                      <div><b>Last Updated:</b> {drawerData.last_updated ? new Date(drawerData.last_updated).toLocaleString() : ''}</div>
                      <div><b>Tag:</b> {drawerData.tag}</div>
                    </>
                  ) : (
                    <>
                      <div><b>Email:</b> {drawerData.email}</div>
                      <div><b>Role:</b> {drawerData.role}</div>
                      <div><b>Status:</b> {drawerData.status}</div>
                      <div><b>Created At:</b> {drawerData.createdAt ? new Date(drawerData.createdAt).toLocaleString() : ''}</div>
                      <div><b>Last Login:</b> {drawerData.lastLogin ? new Date(drawerData.lastLogin).toLocaleString() : ''}</div>
                      {/* Add more user fields as needed */}
                    </>
                  )}
                </div>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose asChild>
            <Button className="w-full mt-4" variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}