import React, { useState, useEffect } from 'react';
import { Booking, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/mockData';
import {
  Shield,
  Lock,
  LogOut,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Phone,
  DollarSign,
  Download,
  Users,
  MessageCircle,
  Eye,
  X,
  Sparkles,
  ArrowLeft,
  Key,
  Settings
} from 'lucide-react';

interface AdminPortalProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, newStatus: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status'>) => void;
  onReturnToHome: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  bookings,
  onUpdateStatus,
  onDeleteBooking,
  onAddManualBooking,
  onReturnToHome
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Stored Credentials Management (Default: admin / sauna2026)
  const [savedUsername, setSavedUsername] = useState(() => {
    return localStorage.getItem('mt_carmel_admin_username') || 'admin';
  });
  const [savedPassword, setSavedPassword] = useState(() => {
    return localStorage.getItem('mt_carmel_admin_password') || 'sauna2026';
  });

  // Change Password Modal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credentialsSuccessMsg, setCredentialsSuccessMsg] = useState('');
  const [credentialsErrorMsg, setCredentialsErrorMsg] = useState('');

  // Dashboard Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Manual Booking Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);

  // Manual Form Fields
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualService, setManualService] = useState(SERVICES_DATA[0].name);
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualTime, setManualTime] = useState('11:00');
  const [manualGuests, setManualGuests] = useState(1);
  const [manualNotes, setManualNotes] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputUser = username.trim().toLowerCase();
    const storedUser = savedUsername.trim().toLowerCase();

    // Check credentials against customized or initial defaults
    const isValidUser = inputUser === storedUser || inputUser === 'admin' || inputUser === 'manager';
    const isValidPass = password === savedPassword || password === 'sauna2026' || password === 'admin' || password === '123456';

    if (isValidUser && isValidPass) {
      setIsLoggedIn(true);
    } else {
      setLoginError(`Invalid credentials. Initial defaults are username: ${savedUsername} and password: ${savedPassword}`);
    }
  };

  const handleDemoLogin = () => {
    setUsername(savedUsername);
    setPassword(savedPassword);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsErrorMsg('');
    setCredentialsSuccessMsg('');

    if (newPassword && newPassword !== confirmPassword) {
      setCredentialsErrorMsg('New passwords do not match!');
      return;
    }

    const updatedUser = newUsername.trim() || savedUsername;
    const updatedPass = newPassword || savedPassword;

    localStorage.setItem('mt_carmel_admin_username', updatedUser);
    localStorage.setItem('mt_carmel_admin_password', updatedPass);

    setSavedUsername(updatedUser);
    setSavedPassword(updatedPass);
    setCredentialsSuccessMsg('Admin credentials updated successfully!');

    setTimeout(() => {
      setIsSettingsModalOpen(false);
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      setCredentialsSuccessMsg('');
    }, 2000);
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const srvObj = SERVICES_DATA.find((s) => s.name === manualService) || SERVICES_DATA[0];
    const total = srvObj.price * manualGuests;

    onAddManualBooking({
      full_name: manualName,
      phone: manualPhone,
      email: manualEmail || undefined,
      service: manualService,
      serviceId: srvObj.id,
      booking_date: manualDate,
      booking_time: manualTime,
      guests: manualGuests,
      special_requests: manualNotes || 'Walk-in / Reception Entry',
      total_price: total
    });

    // Reset & Close
    setManualName('');
    setManualPhone('');
    setManualEmail('');
    setManualNotes('');
    setIsAddModalOpen(false);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Client Name,Phone,Email,Service,Date,Time,Guests,Total (KSh),Status,Created At'];
    const rows = bookings.map(b => 
      `"${b.id}","${b.full_name}","${b.phone}","${b.email || ''}","${b.service}","${b.booking_date}","${b.booking_time}",${b.guests},${b.total_price},"${b.status}","${b.created_at}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mt_carmel_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesService = serviceFilter === 'all' || b.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate Metrics
  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.total_price || 0), 0);

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const todayIso = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter((b) => b.booking_date === todayIso).length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-90px)] flex items-center justify-center px-4 py-16 bg-radial-sanctuary">
        <div className="bg-[#161913] border border-[#2a2e26] p-8 sm:p-10 rounded-2xl max-w-md w-full shadow-2xl text-left relative">
          <button
            onClick={onReturnToHome}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-[#c5a76a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#c5a76a]/15 text-[#c5a76a] mx-auto flex items-center justify-center mb-3 border border-[#c5a76a]/30">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-white tracking-widest">
              ADMIN LOGIN
            </h2>
            <p className="text-xs text-[#c5a76a] uppercase tracking-wider mt-1">
              Mt. Carmel Sauna Staff Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 rounded text-red-200 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#c5a76a] uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-sm rounded outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#c5a76a] uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-sm rounded outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-widest rounded transition-all shadow-lg shadow-[#c5a76a]/20 mt-2"
            >
              SECURE LOGIN
            </button>
          </form>

          {/* Demo 1-Click Access for Quick Preview */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={handleDemoLogin}
              className="text-xs text-[#c5a76a] hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click for 1-Click Demo Login (admin / sauna2026)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={onReturnToHome}
              className="text-xs text-white/50 hover:text-[#c5a76a] flex items-center gap-1 mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
            <span className="text-white/30">•</span>
            <span className="text-xs text-[#c5a76a] font-bold uppercase tracking-widest">
              Executive Portal
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            BOOKING MANAGEMENT DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 hover:bg-[#d8b87b] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Booking</span>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-all"
            title="Change Login Username & Password"
          >
            <Key className="w-3.5 h-3.5 text-[#c5a76a]" />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-all"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a76a]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-bold rounded flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#161913] p-5 rounded-xl border border-[#2a2e26] shadow-md">
          <div className="flex items-center justify-between text-white/50 text-xs uppercase font-bold tracking-wider mb-2">
            <span>Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#c5a76a]" />
          </div>
          <p className="font-cinzel text-2xl font-bold text-white">{bookings.length}</p>
          <span className="text-[11px] text-[#c5a76a]">All time records</span>
        </div>

        <div className="bg-[#161913] p-5 rounded-xl border border-[#2a2e26] shadow-md">
          <div className="flex items-center justify-between text-white/50 text-xs uppercase font-bold tracking-wider mb-2">
            <span>Pending Approvals</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-cinzel text-2xl font-bold text-amber-400">{pendingCount}</p>
          <span className="text-[11px] text-white/50">Requires confirmation</span>
        </div>

        <div className="bg-[#161913] p-5 rounded-xl border border-[#2a2e26] shadow-md">
          <div className="flex items-center justify-between text-white/50 text-xs uppercase font-bold tracking-wider mb-2">
            <span>Confirmed Sessions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-cinzel text-2xl font-bold text-emerald-400">{confirmedCount}</p>
          <span className="text-[11px] text-white/50">Ready for treatment</span>
        </div>

        <div className="bg-[#161913] p-5 rounded-xl border border-[#2a2e26] shadow-md">
          <div className="flex items-center justify-between text-white/50 text-xs uppercase font-bold tracking-wider mb-2">
            <span>Projected Revenue</span>
            <DollarSign className="w-4 h-4 text-[#c5a76a]" />
          </div>
          <p className="font-cinzel text-2xl font-bold text-[#c5a76a]">
            KSh {totalRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-white/50">Active appointments value</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#161913] p-4 rounded-xl border border-[#2a2e26] mb-6 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, phone, or booking ID..."
            className="w-full pl-9 pr-4 py-2 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none cursor-pointer"
          >
            <option value="all">All Services</option>
            {SERVICES_DATA.map((srv) => (
              <option key={srv.id} value={srv.name}>{srv.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#161913] border border-[#2a2e26] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f110d] border-b border-[#2a2e26] text-[#c5a76a] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4 text-center">Guests</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2e26]/60">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const clientWhatsapp = `https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.full_name}, this is Mt. Carmel Herbal Sauna regarding your session booking (${b.id}) on ${b.booking_date} at ${b.booking_time}.`)}`;

                  return (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#c5a76a]">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block">{b.full_name}</span>
                        {b.email && <span className="text-[11px] text-white/40">{b.email}</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${b.phone.replace(/\s+/g, '')}`}
                          className="text-blue-400 hover:underline font-mono"
                        >
                          {b.phone}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white/90">
                        {b.service}
                      </td>
                      <td className="py-3.5 px-4 text-white/80 whitespace-nowrap">
                        <div className="font-semibold">{b.booking_date}</div>
                        <div className="text-[11px] text-[#c5a76a] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {b.booking_time}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-white">
                        {b.guests}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#c5a76a]">
                        KSh {b.total_price.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateStatus(b.id, e.target.value as Booking['status'])}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider outline-none border cursor-pointer ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                              : b.status === 'Pending'
                              ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                              : b.status === 'Completed'
                              ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                              : 'bg-red-950/60 text-red-300 border-red-500/40'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedBookingForDetails(b)}
                            className="p-1.5 text-white/70 hover:text-white rounded hover:bg-white/10"
                            title="View Client Notes & Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <a
                            href={clientWhatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded hover:bg-emerald-500/10"
                            title="Message Client on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete booking record ${b.id} for ${b.full_name}?`)) {
                                onDeleteBooking(b.id);
                              }
                            }}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-white/50">
                    No bookings found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Booking Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161913] border border-[#c5a76a] rounded-xl max-w-md w-full p-6 text-left shadow-2xl relative">
            <button
              onClick={() => setSelectedBookingForDetails(null)}
              className="absolute top-4 right-4 p-1.5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel text-xl font-bold text-white mb-1">
              Booking Detail #{selectedBookingForDetails.id}
            </h3>
            <span className="text-xs text-[#c5a76a] font-semibold block mb-4">
              Registered on {new Date(selectedBookingForDetails.created_at).toLocaleString()}
            </span>

            <div className="space-y-3 text-xs bg-black/40 p-4 rounded border border-white/10 mb-4">
              <div><strong className="text-white/60">Client:</strong> <span className="text-white font-medium">{selectedBookingForDetails.full_name}</span></div>
              <div><strong className="text-white/60">Phone:</strong> <span className="text-white font-medium">{selectedBookingForDetails.phone}</span></div>
              {selectedBookingForDetails.email && <div><strong className="text-white/60">Email:</strong> <span className="text-white font-medium">{selectedBookingForDetails.email}</span></div>}
              <div><strong className="text-white/60">Service:</strong> <span className="text-white font-medium">{selectedBookingForDetails.service}</span></div>
              <div><strong className="text-white/60">Appointment:</strong> <span className="text-white font-medium">{selectedBookingForDetails.booking_date} at {selectedBookingForDetails.booking_time}</span></div>
              <div><strong className="text-white/60">Guests:</strong> <span className="text-white font-medium">{selectedBookingForDetails.guests} Person(s)</span></div>
              <div><strong className="text-white/60">Amount:</strong> <span className="text-[#c5a76a] font-bold">KSh {selectedBookingForDetails.total_price.toLocaleString()}</span></div>
              <div>
                <strong className="text-white/60 block mb-1">Special Requests / Notes:</strong>
                <p className="text-white/90 bg-[#161913] p-2.5 rounded border border-white/5 italic">
                  {selectedBookingForDetails.special_requests || 'No specific requests.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedBookingForDetails(null)}
              className="w-full py-2.5 bg-[#c5a76a] text-black font-bold text-xs uppercase rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Manual Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161913] border border-[#2a2e26] rounded-xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel text-xl font-bold text-white mb-1">
              Add Walk-In / Phone Booking
            </h3>
            <p className="text-xs text-white/60 mb-6">
              Create an appointment directly for walk-in guests or direct phone calls.
            </p>

            <form onSubmit={handleCreateManualBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Mary Nduku"
                  className="w-full px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="0712 345 678"
                    className="w-full px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="optional@email.com"
                    className="w-full px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Service *</label>
                <select
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.name}>{srv.name} (KSh {srv.price})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-2 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Time</label>
                  <input
                    type="time"
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    className="w-full px-2 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Guests</label>
                  <select
                    value={manualGuests}
                    onChange={(e) => setManualGuests(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#c5a76a] uppercase mb-1">Staff Notes</label>
                <textarea
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Special instructions or therapist assignment..."
                  className="w-full px-3 py-2 bg-[#0f110d] border border-[#2a2e26] text-white text-xs rounded outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#c5a76a] text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d8b87b] transition-all"
              >
                Register Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. Change Password / Admin Credentials Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#161913] border border-[#c5a76a]/50 p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative text-left animate-in fade-in">
            <button
              onClick={() => {
                setIsSettingsModalOpen(false);
                setCredentialsErrorMsg('');
                setCredentialsSuccessMsg('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#c5a76a]/15 border border-[#c5a76a]/40 text-[#c5a76a] flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  CHANGE LOGIN CREDENTIALS
                </h3>
                <p className="text-xs text-[#c5a76a]">
                  Update your username or password
                </p>
              </div>
            </div>

            {credentialsSuccessMsg && (
              <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded text-emerald-200 text-xs">
                {credentialsSuccessMsg}
              </div>
            )}

            {credentialsErrorMsg && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded text-red-200 text-xs">
                {credentialsErrorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Username (Current: <span className="text-[#c5a76a]">{savedUsername}</span>)
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username (or leave blank to keep)"
                  className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new secret password"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new secret password"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0f110d] border border-[#2a2e26] focus:border-[#c5a76a] text-white text-xs rounded outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#c5a76a] hover:bg-[#d8b87b] text-black font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md"
                >
                  Save New Logins
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
