'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Users,
  Star,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Download,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  LogOut,
  Save,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Lead, Review, SiteSettings } from '@/lib/content';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'reviews' | 'settings'>('leads');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [newReviewModal, setNewReviewModal] = useState(false);
  const [newReviewData, setNewReviewData] = useState({
    author: '',
    rating: 5,
    text: '',
    hidden: false,
  });

  // Check saved session PIN
  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin_pin');
    if (savedPin) {
      setPin(savedPin);
      verifyPin(savedPin);
    }
  }, []);

  const verifyPin = async (candidatePin: string) => {
    setIsLoading(true);
    setStatusMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'x-admin-pin': candidatePin },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_pin', candidatePin);
        loadData(candidatePin);
      } else {
        setStatusMessage('Неверный PIN-код');
        sessionStorage.removeItem('admin_pin');
      }
    } catch (e) {
      setStatusMessage('Ошибка подключения');
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async (authPin: string) => {
    try {
      const [leadsRes, reviewsRes] = await Promise.all([
        fetch('/api/admin/leads', { headers: { 'x-admin-pin': authPin } }),
        fetch('/api/admin/reviews', { headers: { 'x-admin-pin': authPin } }),
      ]);
      if (leadsRes.ok) {
        const lData = await leadsRes.json();
        setLeads(lData.leads);
      }
      if (reviewsRes.ok) {
        const rData = await reviewsRes.json();
        setReviews(rData.reviews);
      }
    } catch (e) {
      console.error('Error loading admin data', e);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPin(pin);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pin');
    setIsAuthenticated(false);
    setPin('');
  };

  // Leads actions
  const handleLeadStatusChange = async (leadId: string, newStatus: any) => {
    const res = await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify({ id: leadId, status: newStatus }),
    });
    if (res.ok) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    }
  };

  const handleLeadNotesChange = async (leadId: string, newNotes: string) => {
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify({ id: leadId, notes: newNotes }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes: newNotes } : l))
    );
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Удалить эту заявку?')) return;
    const res = await fetch(`/api/admin/leads?id=${leadId}`, {
      method: 'DELETE',
      headers: { 'x-admin-pin': pin },
    });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Date',
      'Name',
      'Phone',
      'Email',
      'Bedrooms',
      'Area',
      'Timeline',
      'Budget',
      'Status',
      'Notes',
    ];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.bedrooms}"`,
      `"${l.area}"`,
      `"${l.timeline}"`,
      `"${l.budget}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reviews actions
  const handleToggleReviewHide = async (reviewId: number, currentHidden: boolean) => {
    const res = await fetch('/api/admin/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify({
        action: 'toggle_hidden',
        reviewId,
        hidden: !currentHidden,
      }),
    });
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, hidden: !currentHidden } : r))
      );
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify({
        action: 'add',
        review: newReviewData,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setReviews(data.reviews);
      setNewReviewModal(false);
      setNewReviewData({ author: '', rating: 5, text: '', hidden: false });
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Удалить этот отзыв навсегда?')) return;
    const res = await fetch('/api/admin/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify({ action: 'delete', reviewId }),
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    }
  };

  // Settings action
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsLoading(true);
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin,
      },
      body: JSON.stringify(settings),
    });
    setIsLoading(false);
    if (res.ok) {
      setStatusMessage('Настройки успешно сохранены!');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7fbfc] to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#20c063] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-center text-[#31312c] mb-2">
            Панель управления
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6 font-light">
            Elena Stazhkova Real Estate CRM
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                PIN-код администратора
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="По умолчанию: elena2026"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#20c063] focus:bg-white text-gray-900"
              />
            </div>

            {statusMessage && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'Проверка...' : 'Войти в панель'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-black">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fbfc] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="font-extrabold text-lg text-gray-900 tracking-tight">
              Elena Stazhkova <span className="text-[#20c063]">CRM</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500 hover:text-black"
            >
              <span>Открыть сайт</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Лиды ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Отзывы Zillow ({reviews.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Настройки</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors ml-2"
              title="Выйти"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Заявки клиентов (Мини-CRM)
                </h2>
                <p className="text-sm text-gray-500 font-light">
                  Все заявки с квиза и форм подбора в реальном времени
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>Экспорт в Excel / CSV</span>
              </button>
            </div>

            {leads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-700">Заявок пока нет</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Новые заявки с сайта появятся здесь автоматически
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          {lead.name}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                          {new Date(lead.createdAt).toLocaleString()}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold uppercase">
                          {lead.lang}
                        </span>
                      </div>

                      {/* Contacts & 1-click WhatsApp */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                        {lead.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-[#20c063]" />
                            <a
                              href={`tel:${lead.phone}`}
                              className="font-medium hover:text-[#20c063]"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        )}
                        {lead.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-[#20c063]" />
                            <a
                              href={`mailto:${lead.email}`}
                              className="font-medium hover:text-[#20c063]"
                            >
                              {lead.email}
                            </a>
                          </div>
                        )}
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Здравствуйте, ${lead.name}! Это Елена Стажкова (риелтор во Флориде). Вы оставляли заявку на подбор недвижимости в ${lead.area}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Написать в WhatsApp</span>
                          </a>
                        )}
                      </div>

                      {/* Search Criteria Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 font-medium text-gray-700">
                          🛏️ {lead.bedrooms}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 font-medium text-gray-700">
                          📍 {lead.area}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 font-medium text-gray-700">
                          ⏱️ {lead.timeline}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 font-medium text-gray-700">
                          💰 {lead.budget}
                        </span>
                      </div>
                    </div>

                    {/* Status & Notes */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:w-96">
                      <div className="flex-1 space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Статус заявки
                        </label>
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#20c063]"
                        >
                          <option value="new">🆕 Новый лид</option>
                          <option value="contacted">📞 Связался</option>
                          <option value="showing">🏡 Подбор / Показы</option>
                          <option value="deal">🤝 Сделка / Аванс</option>
                          <option value="archived">📦 В архив</option>
                        </select>
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Заметки
                        </label>
                        <input
                          type="text"
                          defaultValue={lead.notes || ''}
                          onBlur={(e) => handleLeadNotesChange(lead.id, e.target.value)}
                          placeholder="Заметка..."
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#20c063]"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors self-end sm:self-center"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Управление отзывами Zillow
                </h2>
                <p className="text-sm text-gray-500 font-light">
                  Включайте или отключайте видимость отзывов на сайте одним кликом
                </p>
              </div>
              <button
                onClick={() => setNewReviewModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#20c063] hover:bg-[#1aa654] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить отзыв</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`bg-white rounded-3xl p-6 border transition-all ${
                    rev.hidden
                      ? 'border-gray-200 opacity-60 bg-gray-50/50'
                      : 'border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-base">
                          {rev.author}
                        </span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                        {rev.hidden ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                            СКРЫТ НА САЙТЕ
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            АКТИВЕН НА САЙТЕ
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-light leading-relaxed">
                        {rev.text}
                      </p>
                    </div>

                    {/* Toggle and Delete */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleReviewHide(rev.id, rev.hidden)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                          rev.hidden
                            ? 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {rev.hidden ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Включить</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Отключить</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-2xl bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Настройки сайта и уведомлений
              </h2>
              <p className="text-sm text-gray-500 font-light">
                Параметры получения лидов и ссылки на профили
              </p>
            </div>

            {statusMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200">
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email для получения заявок с сайта
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Контактный телефон риелтора
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, contactPhone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp номер для связи
                </label>
                <input
                  type="text"
                  value={settings.contactWhatsApp}
                  onChange={(e) =>
                    setSettings({ ...settings, contactWhatsApp: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ссылка на Zillow профиль
                </label>
                <input
                  type="text"
                  value={settings.zillowProfileUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, zillowProfileUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ссылка для написания отзыва на Zillow
                </label>
                <input
                  type="text"
                  value={settings.zillowWriteReviewUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, zillowWriteReviewUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Сменить PIN-код администратора
                </label>
                <input
                  type="text"
                  value={settings.adminPin}
                  onChange={(e) =>
                    setSettings({ ...settings, adminPin: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#20c063]"
                />
              </div>

              {/* Notification Toggles */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="font-bold text-sm text-gray-800">Каналы уведомлений</h4>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Уведомления на Email
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          emailEnabled: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-[#20c063]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    WhatsApp оповещения (CallMeBot / Direct)
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifications.whatsappEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          whatsappEnabled: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-[#20c063]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">
                      Telegram-бот (Заглушка готова)
                    </span>
                    <span className="text-xs text-gray-400">
                      Для включения задайте TELEGRAM_BOT_TOKEN в Vercel
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.telegramStubEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          telegramStubEnabled: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-[#20c063]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Сохранение...' : 'Сохранить настройки'}</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Modal: Add Review */}
      {newReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Добавить отзыв клиента
            </h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Имя автора / Ник на Zillow
                </label>
                <input
                  type="text"
                  required
                  value={newReviewData.author}
                  onChange={(e) =>
                    setNewReviewData({ ...newReviewData, author: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Оценка (звёзд)
                </label>
                <select
                  value={newReviewData.rating}
                  onChange={(e) =>
                    setNewReviewData({
                      ...newReviewData,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900"
                >
                  <option value={5}>5 звёзд (★★★★★)</option>
                  <option value={4}>4 звезды (★★★★☆)</option>
                  <option value={3}>3 звезды (★★★☆☆)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Текст отзыва
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReviewData.text}
                  onChange={(e) =>
                    setNewReviewData({ ...newReviewData, text: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setNewReviewModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-black"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#20c063] hover:bg-[#1aa654] text-white text-sm font-semibold rounded-xl shadow-xs"
                >
                  Сохранить отзыв
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
