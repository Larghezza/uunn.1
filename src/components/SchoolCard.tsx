import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Plus, Check } from "lucide-react";

interface SchoolCardProps {
  school: any;
  compareList?: string[];
  onToggleCompare?: (e: React.MouseEvent, slug: string) => void;
  showImage?: boolean;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, compareList = [], onToggleCompare, showImage = false }) => {
  return (
    <Link to={`/schools/${school.slug}`} className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative ${showImage ? '' : 'p-5'}`}>
      {showImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={school.image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"} 
            alt={school.name_zh} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm">
            QS #{school.qs_ranking}
          </div>
          {onToggleCompare && (
            <button
              onClick={(e) => onToggleCompare(e, school.slug)}
              className={`absolute bottom-4 right-4 p-2 rounded-full shadow-md backdrop-blur-sm transition-all ${
                compareList.includes(school.slug) 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-white/90 text-slate-600 hover:bg-white hover:text-indigo-600'
              }`}
              title={compareList.includes(school.slug) ? "取消对比" : "加入对比"}
            >
              {compareList.includes(school.slug) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      )}

      {!showImage && (
        <div className="flex justify-between items-start mb-3">
          <div className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
            QS #{school.qs_ranking}
          </div>
          {onToggleCompare && (
            <button
              onClick={(e) => onToggleCompare(e, school.slug)}
              className={`p-1.5 rounded-full shadow-sm transition-all border ${
                compareList.includes(school.slug) 
                  ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' 
                  : 'bg-white text-slate-400 border-slate-200 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50'
              }`}
              title={compareList.includes(school.slug) ? "取消对比" : "加入对比"}
            >
              {compareList.includes(school.slug) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}

      <div className={`flex-grow flex flex-col ${showImage ? 'p-6' : ''}`}>
        <h3 className={`${showImage ? 'text-xl' : 'text-lg'} font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1`}>{school.name_zh}</h3>
        <p className={`text-sm text-slate-500 ${showImage ? 'mb-4' : 'mb-3'} font-medium line-clamp-1`}>{school.name_en}</p>
        
        <div className={`flex items-center gap-1.5 text-sm text-slate-500 ${showImage ? 'mb-4' : 'mb-3'}`}>
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{school.country}, {school.city}</span>
        </div>

        <div className={`mt-auto ${showImage ? 'pt-4' : 'pt-3'} border-t border-slate-100 flex flex-wrap gap-1.5`}>
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium">
            {school.type}
          </span>
          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[11px] font-medium">
            {school.difficulty_tag}
          </span>
          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[11px] font-medium">
            就业{school.employment_tag}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
