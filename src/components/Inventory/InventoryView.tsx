import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { Package, AlertTriangle, Plus, Search, Building, Phone, DollarSign } from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onRestockItem: (id: string, qty: number) => void;
  onAddItem: (item: InventoryItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  onRestockItem,
  onAddItem
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Prosthetics & Orthotics Inventory Management</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tracking clinical stock levels for SACH feet, mechanical knees, polypropylene sheets, liners & pylons
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, component name, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl p-2 focus:outline-none font-medium text-slate-700"
        >
          <option value="ALL">All Component Categories</option>
          <option value="Feet">Prosthetic Feet (SACH / Single-Axis)</option>
          <option value="Knees">Mechanical & Friction Knees</option>
          <option value="Sockets">Polypropylene & Resins</option>
          <option value="Liners">Liners & Gel Sleeves</option>
          <option value="Pylons & Adapters">Pylons & Adapters</option>
        </select>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isLowStock = item.quantityInStock <= item.reorderThreshold;
          return (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.brand} • {item.sku}</span>
                  <h3 className="font-bold text-slate-900 text-xs mt-0.5">{item.name}</h3>
                </div>
                {isLowStock ? (
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-rose-100 text-rose-700 rounded-md flex items-center gap-1 shrink-0">
                    <AlertTriangle className="w-3 h-3 text-rose-600" /> Low Stock
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                    In Stock
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Quantity Available</span>
                  <span className="text-lg font-bold text-slate-900">{item.quantityInStock} units</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block font-medium">Unit Cost</span>
                  <span className="text-xs font-bold text-slate-800">₦{item.unitCostUsd.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-0.5">
                <p><span className="font-semibold text-slate-900">Supplier:</span> {item.supplierName}</p>
                <p><span className="font-semibold text-slate-900">Contact:</span> {item.supplierContact}</p>
              </div>

              <button
                onClick={() => onRestockItem(item.id, 5)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
              >
                + Restock Batch (5 units)
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
