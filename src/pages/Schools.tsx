import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Search, Filter, X, Sparkles, Plus, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { GoogleGenAI } from "@google/genai";
import SchoolCard from "../components/SchoolCard";

export default function Schools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [countries, setCountries] = useState<any[]>([]);
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    country: searchParams.get("country") || "",
    type: searchParams.get("type") || "",
    search: searchParams.get("q") || ""
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/countries")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  const fetchSchools = useCallback(async (searchOverride?: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.country) query.append("country", filters.country);
      if (filters.type) query.append("type", filters.type);
      
      const searchTerm = searchOverride !== undefined ? searchOverride : filters.search;
      if (searchTerm) query.append("search", searchTerm);
      
      const res = await fetch(`/api/schools?${query.toString()}`);
      const data = await res.json();
      setSchools(data.data || []);
      setTotal(data.total || 0);
      
      // If no results and we have a search query, try AI Smart Search
      if (data.data.length === 0 && searchTerm && !searchOverride && !isSmartSearching) {
        handleSmartSearch(searchTerm);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, isSmartSearching]);

  const handleSmartSearch = async (query: string) => {
    if (!query || query.length < 2) return;
    
    setIsSmartSearching(true);
    try {
      // Get all school names for context
      const allRes = await fetch("/api/schools?limit=1000");
      const allData = await allRes.json();
      const schoolContext = allData.data.map((s: any) => ({ 
        name_zh: s.name_zh, 
        name_en: s.name_en 
      }));

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const prompt = `你是一个留学专家。用户正在搜索学校，输入的关键词是: "${query}"。
      
      这是我们数据库中现有的学校列表: ${JSON.stringify(schoolContext)}。
      
      请分析用户的意图。用户可能使用了昵称、谐音、缩写或错别字（例如用"麻薯"搜"麻省理工"，用"哈佛"搜"Harvard"）。
      
      请找出数据库中最匹配的一个学校的正式中文名称。
      只返回一个包含匹配学校中文名称的 JSON 数组，例如: ["麻省理工学院"]。如果没有匹配项，返回空数组 []。不要有任何解释。`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }]
      });
      const text = result.text;
      
      const match = text.match(/\[.*\]/s);
      if (match) {
        const matchedNames = JSON.parse(match[0]);
        if (matchedNames.length > 0) {
          const suggestion = matchedNames[0];
          setAiSuggestion(suggestion);
          // Fetch again with the suggested name
          fetchSchools(suggestion);
        }
      }
    } catch (error) {
      console.error("Smart search failed:", error);
    } finally {
      setIsSmartSearching(false);
    }
  };

  useEffect(() => {
    setAiSuggestion(null);
    fetchSchools();
  }, [filters, fetchSchools]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key === 'search' ? 'q' : key, value);
    } else {
      newParams.delete(key === 'search' ? 'q' : key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({ country: "", type: "", search: "" });
    setSearchParams(new URLSearchParams());
  };

  const toggleCompare = (e: any, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCompareList(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) {
        alert("最多只能选择3所学校进行对比");
        return prev;
      }
      return [...prev, slug];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>全球院校库 - GlobalEdu</title>
        <meta name="description" content="探索并对比全球顶尖学府，找到最适合你的留学目的地。支持多维度筛选和搜索。" />
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">全球院校库</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            探索并对比全球顶尖学府，找到最适合你的留学目的地。共收录 {total} 所院校。
          </p>
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-slate-700 font-medium"
        >
          <Filter className="w-5 h-5" /> 筛选
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-5 h-5" /> 筛选条件
              </h2>
              {(filters.country || filters.type || filters.search) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  清除全部
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">搜索院校</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="输入学校名称..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">国家/地区</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="country"
                      checked={filters.country === ""}
                      onChange={() => handleFilterChange("country", "")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">全部国家</span>
                  </label>
                  {countries.map((c) => (
                    <label key={c.country} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="country"
                        checked={filters.country === c.country}
                        onChange={() => handleFilterChange("country", c.country)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{c.country} ({c.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">学校类型</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={filters.type === ""}
                      onChange={() => handleFilterChange("type", "")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">全部类型</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={filters.type === "公立"}
                      onChange={() => handleFilterChange("type", "公立")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">公立</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={filters.type === "私立"}
                      onChange={() => handleFilterChange("type", "私立")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">私立</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {aiSuggestion && (
            <div className="mb-6 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-3 text-indigo-700 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <p className="text-sm font-medium">
                未找到 "{filters.search}"，为您展示 <span className="font-bold underline">"{aiSuggestion}"</span> 的结果
              </p>
            </div>
          )}

          {loading || isSmartSearching ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              {isSmartSearching && <p className="text-sm text-slate-500 animate-pulse">正在为您智能匹配院校...</p>}
            </div>
          ) : schools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schools.map((school) => (
                <SchoolCard 
                  key={school.id} 
                  school={school} 
                  compareList={compareList} 
                  onToggleCompare={toggleCompare} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">未找到匹配的院校</h3>
              <p className="text-slate-500 mb-6">尝试调整筛选条件或搜索关键词。</p>
              <button 
                onClick={clearFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {compareList.length}/3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">已选择 {compareList.length} 所学校</p>
                <p className="text-xs text-slate-500">最多可选择 3 所学校进行横向对比</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCompareList([])}
                className="text-sm text-slate-500 hover:text-slate-700 font-medium px-4 py-2"
              >
                清空
              </button>
              <button 
                onClick={() => navigate(`/compare?slugs=${compareList.join(",")}`)}
                disabled={compareList.length < 2}
                className={`px-6 py-2.5 rounded-xl font-bold transition-colors ${
                  compareList.length >= 2 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {compareList.length < 2 ? '至少选择2所' : '开始对比'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
