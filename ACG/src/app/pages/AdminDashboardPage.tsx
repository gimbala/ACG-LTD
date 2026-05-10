import { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import {
  Lock, User, Mail, Key, Users, Package as PackageIcon, FileText, DollarSign, TrendingUp,
  Plus, Edit, Trash2, Save, X, Search, Filter, CheckCircle2, Clock, AlertCircle,
  Settings, LogOut, LayoutDashboard, ShoppingBag, FolderOpen
} from 'lucide-react';
import type { Client, Package, PackageDocument, PackageService } from '@/types/acg';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchClientsForAdmin,
  fetchPackagesForAdmin,
  upsertClient,
  upsertPackage,
  deleteClientCase,
  deletePackage,
  persistAdminProgressUpdate,
  fetchProfile,
} from '@/lib/supabase-data';
import { getSupabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase-config';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface AdminDashboardPageProps {
  onNavigate: (page: Page) => void;
}

export function AdminDashboardPage({ onNavigate }: AdminDashboardPageProps) {
  const { session, profile, signIn, signOut } = useAuth();
  const useCloudAuth = isSupabaseConfigured();
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'packages'>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAdminLoggedIn = useCloudAuth
    ? Boolean(session?.user && profile?.role === 'admin')
    : demoLoggedIn;

  // Client Management State
  const [clients, setClients] = useState<Client[]>(() =>
    isSupabaseConfigured()
      ? []
      : [
    {
      id: '1',
      name: 'John Mensah',
      email: 'john.mensah@email.com',
      phone: '+233 24 123 4567',
      currentLocation: 'Accra, Ghana',
      destination: 'Toronto, Canada',
      packageId: '1',
      status: 'active',
      startDate: '2024-01-15',
      progress: 33
    },
    {
      id: '2',
      name: 'Sarah Osei',
      email: 'sarah.osei@email.com',
      phone: '+233 24 987 6543',
      currentLocation: 'Kumasi, Ghana',
      destination: 'London, UK',
      packageId: '2',
      status: 'active',
      startDate: '2024-02-01',
      progress: 50
    },
    ]
  );

  // Package Management State
  const [packages, setPackages] = useState<Package[]>(() =>
    isSupabaseConfigured()
      ? []
      : [
    {
      id: '1',
      name: 'Complete Package',
      description: 'Full relocation support including visa, destination setup, and ongoing support',
      price: 5000,
      services: [
        { id: 's1', name: 'Initial Consultation', status: 'completed', description: 'Welcome call and needs assessment' },
        { id: 's2', name: 'Document Collection', status: 'completed', description: 'Passport, certificates, supporting docs' },
        { id: 's3', name: 'Visa Application Prep', status: 'in-progress', description: 'Application forms and legal review' },
        { id: 's4', name: 'Visa Submission', status: 'pending', description: 'Submit to immigration authorities' },
        { id: 's5', name: 'Home Search', status: 'pending', description: 'Virtual and in-person property tours' },
        { id: 's6', name: 'Pre-Arrival Planning', status: 'pending', description: 'School selection, banking setup' }
      ],
      documents: [
        { id: 'd1', name: 'Passport Copy', required: true, status: 'approved' },
        { id: 'd2', name: 'Birth Certificate', required: true, status: 'approved' },
        { id: 'd3', name: 'Employment Letter', required: true, status: 'submitted' },
        { id: 'd4', name: 'Bank Statements', required: true, status: 'pending' }
      ]
    },
    {
      id: '2',
      name: 'Essential Package',
      description: 'Visa and immigration support only',
      price: 2500,
      services: [
        { id: 's1', name: 'Initial Consultation', status: 'completed', description: 'Welcome call and needs assessment' },
        { id: 's2', name: 'Document Collection', status: 'in-progress', description: 'Passport, certificates, supporting docs' },
        { id: 's3', name: 'Visa Application Prep', status: 'pending', description: 'Application forms and legal review' }
      ],
      documents: [
        { id: 'd1', name: 'Passport Copy', required: true, status: 'approved' },
        { id: 'd2', name: 'Birth Certificate', required: true, status: 'submitted' }
      ]
    },
    ]
  );

  useEffect(() => {
    if (!useCloudAuth || !session?.user || profile?.role !== 'admin') return;
    let cancelled = false;
    void Promise.all([fetchPackagesForAdmin(), fetchClientsForAdmin()]).then(([pkgs, cls]) => {
      if (!cancelled) {
        setPackages(pkgs);
        setClients(cls);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [useCloudAuth, session?.user?.id, profile?.role]);

  // Modal States
  const [showClientModal, setShowClientModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [selectedClientForProgress, setSelectedClientForProgress] = useState<Client | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (useCloudAuth) {
      const { error } = await signIn(email, password);
      if (error) {
        setAuthError(error.message);
        return;
      }
      const sb = getSupabase();
      const { data } = sb ? await sb.auth.getUser() : { data: { user: null } };
      if (!data.user) return;
      const p = await fetchProfile(data.user.id);
      if (p?.role !== 'admin') {
        await signOut();
        setAuthError('This area is for ACG staff accounts only.');
        return;
      }
      return;
    }
    if (email && password) {
      setDemoLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    setAuthError(null);
    if (useCloudAuth) {
      await signOut();
    } else {
      setDemoLoggedIn(false);
    }
    setEmail('');
    setPassword('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
      case 'submitted':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleCreateClient = () => {
    setEditingClient({
      id: crypto.randomUUID(),
      name: '',
      email: '',
      phone: '',
      currentLocation: '',
      destination: '',
      packageId: '',
      status: 'pending',
      startDate: new Date().toISOString().split('T')[0],
      progress: 0
    });
    setShowClientModal(true);
  };

  const handleSaveClient = async (client: Client) => {
    if (useCloudAuth) {
      const { error } = await upsertClient(client);
      if (error) {
        window.alert(error.message);
        return;
      }
    }
    if (clients.find((c) => c.id === client.id)) {
      setClients(clients.map((c) => (c.id === client.id ? client : c)));
    } else {
      setClients([...clients, client]);
    }
    setShowClientModal(false);
    setEditingClient(null);
  };

  const handleDeleteClient = async (id: string) => {
    if (useCloudAuth) {
      const { error } = await deleteClientCase(id);
      if (error) {
        window.alert(error.message);
        return;
      }
    }
    setClients(clients.filter((c) => c.id !== id));
  };

  const handleCreatePackage = () => {
    setEditingPackage({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: 0,
      services: [],
      documents: []
    });
    setShowPackageModal(true);
  };

  const handleSavePackage = async (pkg: Package) => {
    if (useCloudAuth) {
      const { error } = await upsertPackage(pkg);
      if (error) {
        window.alert(error.message);
        return;
      }
    }
    if (packages.find((p) => p.id === pkg.id)) {
      setPackages(packages.map((p) => (p.id === pkg.id ? pkg : p)));
    } else {
      setPackages([...packages, pkg]);
    }
    setShowPackageModal(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = async (id: string) => {
    if (useCloudAuth) {
      const { error } = await deletePackage(id);
      if (error) {
        window.alert(error.message);
        return;
      }
    }
    setPackages(packages.filter((p) => p.id !== id));
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="admin" onNavigate={onNavigate} />

        <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{fontWeight: 800}}>
                  Admin Dashboard
                </h1>
                <p className="text-xl text-white/90">
                  Manage clients, packages, and track progress
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-2xl p-8">
                {authError && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {authError}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@acghana.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>
                      Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white py-4 rounded-lg hover:shadow-lg transition-all"
                    style={{fontWeight: 700}}
                  >
                    Sign In to Admin Dashboard
                  </button>
                </form>
              </div>

              {!useCloudAuth && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm text-white/80">
                    <strong>Demo:</strong> Enter any email and password to access
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="admin" onNavigate={onNavigate} />

      {/* Admin Header */}
      <section className="bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2" style={{fontWeight: 800}}>
                Admin Dashboard
              </h1>
              <p className="text-white/80">
                Manage clients, packages, and track relocation progress
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
              style={{fontWeight: 600}}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'clients'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Clients ({clients.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'packages'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Packages ({packages.length})
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Overview Tab */}
      {activeTab === 'dashboard' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#6366F1]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B] mb-1">Total Clients</p>
                    <p className="text-3xl text-[#1E1B4B]" style={{fontWeight: 800}}>{clients.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-[#6366F1]" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#F97316]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B] mb-1">Active Cases</p>
                    <p className="text-3xl text-[#1E1B4B]" style={{fontWeight: 800}}>
                      {clients.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-[#F97316]" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B] mb-1">Packages</p>
                    <p className="text-3xl text-[#1E1B4B]" style={{fontWeight: 800}}>{packages.length}</p>
                  </div>
                  <PackageIcon className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B] mb-1">Revenue</p>
                    <p className="text-3xl text-[#1E1B4B]" style={{fontWeight: 800}}>
                      ${packages.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl text-[#1E1B4B] mb-6" style={{fontWeight: 800}}>
                Recent Clients
              </h2>
              <div className="space-y-4">
                {clients.slice(0, 5).map(client => {
                  const pkg = packages.find(p => p.id === client.packageId);
                  return (
                    <div key={client.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white" style={{fontWeight: 700}}>
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{client.name}</p>
                          <p className="text-sm text-[#64748B]">
                            {client.currentLocation} → {client.destination}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-[#64748B]">{pkg?.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#6366F1] to-[#F97316]"
                                style={{ width: `${client.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-[#64748B]">{client.progress}%</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(client.status)}`} style={{fontWeight: 600}}>
                          {client.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
                Client Management
              </h2>
              <button
                onClick={handleCreateClient}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                style={{fontWeight: 700}}
              >
                <Plus className="w-5 h-5" />
                Add New Client
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Client</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Contact</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Route</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Package</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Progress</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Status</th>
                    <th className="px-6 py-4 text-left text-sm text-[#64748B]" style={{fontWeight: 600}}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map(client => {
                    const pkg = packages.find(p => p.id === client.packageId);
                    return (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{client.name}</p>
                          <p className="text-sm text-[#64748B]">ID: {client.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#64748B]">{client.email}</p>
                          <p className="text-sm text-[#64748B]">{client.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#64748B]">{client.currentLocation}</p>
                          <p className="text-sm text-[#64748B]">→ {client.destination}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#1E1B4B]">{pkg?.name || 'Not assigned'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#6366F1] to-[#F97316]"
                                style={{ width: `${client.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-[#64748B]">{client.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(client.status)}`} style={{fontWeight: 600}}>
                            {client.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedClientForProgress(client);
                              }}
                              className="p-2 text-[#6366F1] hover:bg-[#6366F1]/10 rounded transition-colors"
                              title="Update Progress"
                            >
                              <TrendingUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingClient(client);
                                setShowClientModal(true);
                              }}
                              className="p-2 text-[#F97316] hover:bg-[#F97316]/10 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(client.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
                Package Management
              </h2>
              <button
                onClick={handleCreatePackage}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                style={{fontWeight: 700}}
              >
                <Plus className="w-5 h-5" />
                Create Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl text-[#1E1B4B] mb-2" style={{fontWeight: 700}}>{pkg.name}</h3>
                      <p className="text-[#64748B]">{pkg.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPackage(pkg);
                          setShowPackageModal(true);
                        }}
                        className="p-2 text-[#F97316] hover:bg-[#F97316]/10 rounded transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#F97316]" style={{fontWeight: 800}}>
                      ${pkg.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm text-[#64748B] mb-3" style={{fontWeight: 600}}>Services ({pkg.services.length})</h4>
                    <div className="space-y-2">
                      {pkg.services.slice(0, 3).map(service => (
                        <div key={service.id} className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B]">{service.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      ))}
                      {pkg.services.length > 3 && (
                        <p className="text-sm text-[#6366F1]">+{pkg.services.length - 3} more services</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-[#64748B] mb-3" style={{fontWeight: 600}}>Documents ({pkg.documents.length})</h4>
                    <div className="space-y-2">
                      {pkg.documents.slice(0, 3).map(doc => (
                        <div key={doc.id} className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B]">{doc.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                            {doc.required ? 'Required' : 'Optional'}
                          </span>
                        </div>
                      ))}
                      {pkg.documents.length > 3 && (
                        <p className="text-sm text-[#6366F1]">+{pkg.documents.length - 3} more documents</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Modal */}
      {showClientModal && editingClient && (
        <ClientModal
          client={editingClient}
          packages={packages}
          onSave={handleSaveClient}
          onClose={() => {
            setShowClientModal(false);
            setEditingClient(null);
          }}
        />
      )}

      {/* Package Modal */}
      {showPackageModal && editingPackage && (
        <PackageModal
          package={editingPackage}
          onSave={handleSavePackage}
          onClose={() => {
            setShowPackageModal(false);
            setEditingPackage(null);
          }}
        />
      )}

      {/* Progress Update Modal */}
      {selectedClientForProgress && (
        <ProgressModal
          client={selectedClientForProgress}
          package={packages.find(p => p.id === selectedClientForProgress.packageId)!}
          onSave={async (updatedClient, updatedPackage) => {
            if (useCloudAuth) {
              const { error } = await persistAdminProgressUpdate(updatedClient, updatedPackage);
              if (error) {
                window.alert(error.message);
                return;
              }
            }
            setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
            setPackages(packages.map((p) => (p.id === updatedPackage.id ? updatedPackage : p)));
            setSelectedClientForProgress(null);
          }}
          onClose={() => setSelectedClientForProgress(null)}
        />
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// Client Modal Component
function ClientModal({
  client,
  packages,
  onSave,
  onClose
}: {
  client: Client;
  packages: Package[];
  onSave: (client: Client) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(client);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
            {client.name ? 'Edit Client' : 'New Client'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Current Location
              </label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Package *
              </label>
              <select
                value={formData.packageId}
                onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                required
              >
                <option value="">Select Package</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name} - ${pkg.price}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Client['status'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-[#64748B] hover:bg-gray-200 rounded-lg transition-colors"
            style={{fontWeight: 600}}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            style={{fontWeight: 700}}
          >
            <Save className="w-5 h-5" />
            Save Client
          </button>
        </div>
      </div>
    </div>
  );
}

// Package Modal Component
function PackageModal({
  package: pkg,
  onSave,
  onClose
}: {
  package: Package;
  onSave: (pkg: Package) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(pkg);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [newDocument, setNewDocument] = useState({ name: '', required: true });

  const addService = () => {
    if (newService.name) {
      setFormData({
        ...formData,
        services: [...formData.services, {
          id: Date.now().toString(),
          name: newService.name,
          description: newService.description,
          status: 'pending'
        }]
      });
      setNewService({ name: '', description: '' });
    }
  };

  const removeService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== id)
    });
  };

  const addDocument = () => {
    if (newDocument.name) {
      setFormData({
        ...formData,
        documents: [...formData.documents, {
          id: Date.now().toString(),
          name: newDocument.name,
          required: newDocument.required,
          status: 'pending'
        }]
      });
      setNewDocument({ name: '', required: true });
    }
  };

  const removeDocument = (id: string) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter(d => d.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
            {pkg.name ? 'Edit Package' : 'New Package'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                  Package Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                  Price (USD) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>Services</h3>
            <div className="space-y-3">
              {formData.services.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{service.name}</p>
                    <p className="text-sm text-[#64748B]">{service.description}</p>
                  </div>
                  <button
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Service name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
              <button
                onClick={addService}
                className="px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#5558E3]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>Required Documents</h3>
            <div className="space-y-3">
              {formData.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{doc.name}</p>
                    <p className="text-sm text-[#64748B]">{doc.required ? 'Required' : 'Optional'}</p>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Document name"
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              />
              <select
                value={newDocument.required ? 'required' : 'optional'}
                onChange={(e) => setNewDocument({ ...newDocument, required: e.target.value === 'required' })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
              >
                <option value="required">Required</option>
                <option value="optional">Optional</option>
              </select>
              <button
                onClick={addDocument}
                className="px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#5558E3]"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-[#64748B] hover:bg-gray-200 rounded-lg transition-colors"
            style={{fontWeight: 600}}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            style={{fontWeight: 700}}
          >
            <Save className="w-5 h-5" />
            Save Package
          </button>
        </div>
      </div>
    </div>
  );
}

// Progress Update Modal
function ProgressModal({
  client,
  package: pkg,
  onSave,
  onClose
}: {
  client: Client;
  package: Package;
  onSave: (client: Client, pkg: Package) => void;
  onClose: () => void;
}) {
  const [updatedPackage, setUpdatedPackage] = useState(pkg);
  const [progress, setProgress] = useState(client.progress);

  const updateServiceStatus = (serviceId: string, status: PackageService['status']) => {
    setUpdatedPackage({
      ...updatedPackage,
      services: updatedPackage.services.map(s =>
        s.id === serviceId ? { ...s, status } : s
      )
    });

    // Auto-calculate progress
    const completed = updatedPackage.services.filter(s =>
      s.id === serviceId ? status === 'completed' : s.status === 'completed'
    ).length;
    const newProgress = Math.round((completed / updatedPackage.services.length) * 100);
    setProgress(newProgress);
  };

  const updateDocumentStatus = (docId: string, status: PackageDocument['status']) => {
    setUpdatedPackage({
      ...updatedPackage,
      documents: updatedPackage.documents.map(d =>
        d.id === docId ? { ...d, status } : d
      )
    });
  };

  const handleSave = () => {
    onSave({ ...client, progress }, updatedPackage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
              Update Progress: {client.name}
            </h2>
            <p className="text-[#64748B]">Overall Progress: {progress}%</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Progress Bar */}
          <div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#6366F1] to-[#F97316] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Services Status */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>Service Milestones</h3>
            <div className="space-y-3">
              {updatedPackage.services.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{service.name}</p>
                    <p className="text-sm text-[#64748B]">{service.description}</p>
                  </div>
                  <select
                    value={service.status}
                    onChange={(e) => updateServiceStatus(service.id, e.target.value as PackageService['status'])}
                    className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Status */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>Document Status</h3>
            <div className="space-y-3">
              {updatedPackage.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{doc.name}</p>
                    <p className="text-sm text-[#64748B]">{doc.required ? 'Required' : 'Optional'}</p>
                  </div>
                  <select
                    value={doc.status}
                    onChange={(e) => updateDocumentStatus(doc.id, e.target.value as PackageDocument['status'])}
                    className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-[#64748B] hover:bg-gray-200 rounded-lg transition-colors"
            style={{fontWeight: 600}}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            style={{fontWeight: 700}}
          >
            <Save className="w-5 h-5" />
            Update Progress
          </button>
        </div>
      </div>
    </div>
  );
}
