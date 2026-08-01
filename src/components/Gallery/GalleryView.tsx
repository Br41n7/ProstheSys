import React, { useState } from 'react';
import { Patient, ClinicalImage } from '../../types';
import { Image as ImageIcon, Upload, Eye, Tag, Calendar } from 'lucide-react';

interface GalleryViewProps {
  patient: Patient;
  images: ClinicalImage[];
  onUploadImage: (img: ClinicalImage) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  patient,
  images,
  onUploadImage
}) => {
  const patientImages = images.filter(i => i.patientId === patient.id);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filtered = patientImages.filter(i => selectedCategory === 'ALL' || i.category === selectedCategory);

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Clinical Image & X-Ray Vault</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Visual inspection vault & skin check logs for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs bg-white p-2 rounded-2xl border border-slate-200">
        {['ALL', 'Residual Limb', 'Socket Fit', 'X-Ray / Scan', 'Progress Photo'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            No clinical photos found for this category.
          </div>
        ) : (
          filtered.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-slate-900 relative overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold bg-slate-900/80 text-white backdrop-blur rounded">
                  {img.category}
                </span>
              </div>
              <div className="p-4 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{img.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{img.uploadedAt}</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{img.caption}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
