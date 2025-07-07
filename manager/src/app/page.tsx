'use client'
import React, { useState, useEffect } from 'react';

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
    <button
      onClick={checkStatus}
      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-gray-900/80 rounded-full shadow border border-gray-200 dark:border-gray-700 z-50"
      title={connected === null ? 'Checking MongoDB...' : connected ? 'MongoDB Connected' : 'MongoDB Disconnected'}
    >
      <span
        className={`w-3 h-3 rounded-full inline-block transition-colors duration-300 ${
          loading ? 'bg-gray-400 animate-pulse' : connected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className="text-xs text-gray-800 dark:text-gray-100 font-medium">
        MongoDB
      </span>
    </button>
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
        // Refresh model list
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Admin Login</h2>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={e => setId(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181b] text-white flex flex-col p-8 border-r border-[#23232a]">
        <h2 className="text-2xl font-bold mb-10">Manager</h2>
        <button
          className={`mb-2 py-2 px-4 rounded text-left transition-colors w-full ${activePage === 'models' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          onClick={() => setActivePage('models')}
        >
          Models
        </button>
        <button
          className={`mb-2 py-2 px-4 rounded text-left transition-colors w-full ${activePage === 'user' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          onClick={() => setActivePage('user')}
        >
          User
        </button>
        <button
          className="mt-auto py-2 px-4 rounded text-left transition-colors w-full hover:bg-red-600"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-[#23232a] relative">
        <MongoStatusButton />
        {activePage === 'models' && (
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Add Models</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
              <form onSubmit={handleAddModel} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={e => setModelName(e.target.value)}
                    placeholder="Enter model name"
                    className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Model Description
                  </label>
                  <textarea
                    value={modelDescription}
                    onChange={e => setModelDescription(e.target.value)}
                    placeholder="Enter model description"
                    className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                {addModelError && <div className="text-red-500 text-sm">{addModelError}</div>}
                {addModelSuccess && <div className="text-green-600 text-sm">{addModelSuccess}</div>}
                <button
                  type="submit"
                  className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors w-full"
                  disabled={addModelLoading}
                >
                  {addModelLoading ? 'Adding...' : 'Add Model'}
                </button>
              </form>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">All Models</h2>
            {modelsLoading && <div className="text-center text-gray-500">Loading models...</div>}
            {modelsError && <div className="text-center text-red-500">{modelsError}</div>}
            {!modelsLoading && !modelsError && models.length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {models.map(model => (
                  <div key={model._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{model.model_name}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{model.short_description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Status: {model.status || 'N/A'} | Parameters: {model.parameters || 'N/A'}</div>
                  </div>
                ))}
              </div>
            )}
            {!modelsLoading && !modelsError && models.length === 0 && (
              <div className="text-center text-gray-500">No models found.</div>
            )}
          </div>
        )}
        {activePage === 'user' && (
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">User Management</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">
                Manage user accounts, permissions, and settings here.
              </p>
              {usersLoading && <div className="text-center text-gray-500">Loading users...</div>}
              {usersError && <div className="text-center text-red-500">{usersError}</div>}
              {!usersLoading && !usersError && users.length > 0 && (
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user._id} className="flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Plan: <span className="font-medium text-blue-700 dark:text-blue-300">{user.active_subscription?.plan || 'N/A'}</span> | Status: {user.active_subscription?.status ? 'Active' : 'Inactive'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Default Model: {user.preferences?.defaultModel || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!usersLoading && !usersError && users.length === 0 && (
                <div className="text-center text-gray-500">No users found.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}