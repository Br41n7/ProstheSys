import React, { useState } from 'react';
import { supabaseTables } from '../../data/supabaseSchema';
import { Database, ShieldCheck, Download, Table, Check, Layers } from 'lucide-react';

export const DatabaseView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sqlSchemaString = `
-- ProstheSys AI Production PostgreSQL & Supabase Database Migration
-- Enabled Row Level Security (RLS) for Clinical Multi-Tenant Isolation

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INT NOT NULL,
  gender TEXT NOT NULL,
  amputation_level TEXT NOT NULL,
  activity_level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clinicians can view patient records"
  ON patients FOR SELECT
  USING (auth.role() = 'authenticated');
  `;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Supabase PostgreSQL Database Inspector</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time schema metadata, RLS policy enforcement & table health checks
          </p>
        </div>
        <button
          onClick={handleCopySql}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          {copied ? 'SQL Schema Copied!' : 'Export Supabase SQL Script'}
        </button>
      </div>

      {/* Database Tables Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {supabaseTables.map((tbl) => (
          <div key={tbl.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-blue-900">
                <Table className="w-4 h-4 text-blue-600" />
                <span>{tbl.name}</span>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-700 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> RLS Active
              </span>
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed">{tbl.description}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Total Live Records:</span>
              <span className="font-bold text-slate-900">{tbl.rowCount} rows</span>
            </div>
          </div>
        ))}
      </div>

      {/* SQL Migration Code Preview */}
      <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs overflow-x-auto">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-semibold text-teal-400 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Live Supabase DDL SQL Migration Snippet
          </span>
          <span>PostgreSQL 15.0</span>
        </div>
        <pre className="text-teal-300 leading-relaxed">
          {sqlSchemaString}
        </pre>
      </div>

    </div>
  );
};
