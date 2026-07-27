'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit3,
  Search,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
  FileText,
  Database,
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  vectorIndexed: boolean;
}

const initialKnowledge: KnowledgeItem[] = [
  {
    id: 'kb-1',
    category: 'Passport Malumat',
    title: '2026 Jawazat Passport Information Update Guidelines',
    content:
      'Requirements for updating passport info on Absher/Jawazat following Bangladeshi / Indian / Pakistani passport renewal. Valid Iqama and both original passports required.',
    tags: ['malumat', 'passport', 'jawazat', 'absher'],
    vectorIndexed: true,
  },
  {
    id: 'kb-2',
    category: 'Umrah Services',
    title: 'Nusuk Rawdah Permit & Umrah Package Rules',
    content:
      'Official regulations for Nusuk app permit issuance, Makkah & Madinah hotel reservations, and transport arrangements for Saudi expatriates.',
    tags: ['umrah', 'nusuk', 'makkah', 'madinah'],
    vectorIndexed: true,
  },
  {
    id: 'kb-3',
    category: 'MISA Investor License',
    title: 'MISA Commercial License & 100% Foreign Ownership',
    content:
      'Step-by-step procedure for foreign investors to register commercial entities (CR) under Ministry of Investment with bank account opening.',
    tags: ['misa', 'investor', 'cr', 'business'],
    vectorIndexed: true,
  },
  {
    id: 'kb-4',
    category: 'Qiwa / Labor Issues',
    title: 'Qiwa Sponsorship Transfer & Nitaqat Matrix',
    content:
      'Guidelines for transferring kafeel sponsorship via Qiwa portal, contract verification, and HRSD ministry compliance checks.',
    tags: ['qiwa', 'amel', 'labor', 'kafeel'],
    vectorIndexed: true,
  },
];

export default function KnowledgeBaseManagerPage() {
  const [articles, setArticles] = useState<KnowledgeItem[]>(initialKnowledge);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<KnowledgeItem | null>(null);

  // Form fields
  const [category, setCategory] = useState('Passport Malumat');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('');

  const openCreateModal = () => {
    setEditingArticle(null);
    setCategory('Passport Malumat');
    setTitle('');
    setContent('');
    setTagsStr('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: KnowledgeItem) => {
    setEditingArticle(item);
    setCategory(item.category);
    setTitle(item.title);
    setContent(item.content);
    setTagsStr(item.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const parsedTags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((item) =>
          item.id === editingArticle.id
            ? { ...item, category, title, content, tags: parsedTags }
            : item
        )
      );
    } else {
      const newItem: KnowledgeItem = {
        id: `kb-${Date.now()}`,
        category,
        title,
        content,
        tags: parsedTags,
        vectorIndexed: true,
      };
      setArticles((prev) => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Knowledge Base & AI Vector Indexer
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage grounding articles used by AI RAG Search, vector store embeddings, and staff reference manuals.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add Knowledge Article</span>
        </button>
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-950 border border-slate-800 p-6 hover:border-emerald-600/60 shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  <Database className="w-3 h-3" />
                  Vector Indexed
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5 text-amber-500" />
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Edit Article"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                {editingArticle ? 'Edit Article' : 'Add Article'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                >
                  <option value="Passport Malumat">Passport Malumat</option>
                  <option value="Umrah Services">Umrah Services</option>
                  <option value="Flight Ticketing">Flight Ticketing</option>
                  <option value="Ziyarah Visa">Ziyarah Visa</option>
                  <option value="MISA Investor License">MISA Investor License</option>
                  <option value="Qiwa / Labor Issues">Qiwa / Labor Issues</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2026 Jawazat Passport Malumat Rules"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content Text</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="Enter full guidance text..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="malumat, passport, jawazat"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold shadow-md"
                >
                  Save & Index Vector
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
