import { Outlet, Link, useNavigate } from "react-router-dom";
import { Search, Globe, GraduationCap, Menu, X } from "lucide-react";
import React, { useState } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <Globe className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                ArtEdu
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/countries" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                国家/地区
              </Link>
              <Link to="/schools" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                艺术院校库
              </Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                关于我们
              </Link>
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="搜索学校..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </form>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-500 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
            <form onSubmit={handleSearch} className="relative mb-4 mt-2">
              <input
                type="text"
                placeholder="搜索学校..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </form>
            <Link
              to="/countries"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
            >
              国家/地区
            </Link>
            <Link
              to="/schools"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
            >
              艺术院校库
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
            >
              关于我们
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  ArtEdu
                </span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">
                致力于提供全面、客观、专业的海外艺术院校信息，帮助每一位艺术学子找到最适合自己的留学目的地。
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                快速链接
              </h3>
              <ul className="space-y-3">
                <li><Link to="/schools" className="text-sm text-slate-500 hover:text-indigo-600">艺术院校库</Link></li>
                <li><Link to="/countries" className="text-sm text-slate-500 hover:text-indigo-600">热门国家</Link></li>
                <li><Link to="/search" className="text-sm text-slate-500 hover:text-indigo-600">高级搜索</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                关于
              </h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-slate-500 hover:text-indigo-600">关于我们</Link></li>
                <li><Link to="/contact" className="text-sm text-slate-500 hover:text-indigo-600">联系我们</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                法律
              </h3>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-indigo-600">隐私政策</Link></li>
                <li><Link to="/terms" className="text-sm text-slate-500 hover:text-indigo-600">服务条款</Link></li>
                <li><Link to="/admin" className="text-sm text-slate-500 hover:text-indigo-600">管理后台</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} GlobalEdu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
