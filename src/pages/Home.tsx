import { Link } from "react-router-dom";
import { Search, Globe, MapPin, GraduationCap, ArrowRight, Star, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SchoolCard from "../components/SchoolCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topSchools, setTopSchools] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/schools?limit=3")
      .then(res => res.json())
      .then(data => setTopSchools(data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>GlobalEdu - 找到最适合你的海外顶尖艺术院校 | 艺术留学选校平台</title>
        <meta name="description" content="GlobalEdu 是一个全面、客观、专业的艺术留学选校信息平台。横向对比全球顶尖艺术设计名校，多维度筛选，助你做出明智的留学决策。" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1920" 
            alt="Art School Campus" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              找到最适合你的<br />
              <span className="text-indigo-400">海外顶尖艺术院校</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              全面、客观、专业的艺术留学选校信息平台。横向对比全球顶尖艺术与设计名校，多维度筛选，助你做出明智的艺术留学决策。
            </p>
            
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-2xl">
              <div className="relative flex-grow flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="搜索学校名称、国家或艺术专业..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-slate-900 focus:ring-0 text-lg placeholder:text-slate-400"
                />
              </div>
              <Link 
                to={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                开始探索
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="font-medium text-slate-400">热门搜索：</span>
              <Link to="/search?q=交互设计" className="hover:text-white transition-colors">交互设计</Link>
              <Link to="/search?q=服装设计" className="hover:text-white transition-colors">服装设计</Link>
              <Link to="/search?q=纯艺术" className="hover:text-white transition-colors">纯艺术</Link>
              <Link to="/search?q=插画" className="hover:text-white transition-colors">插画</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">为什么选择 GlobalEdu？</h2>
            <p className="text-lg text-slate-600">我们致力于打破信息差，为您提供最透明、最实用的艺术留学选校数据。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">全球艺术院校覆盖</h3>
              <p className="text-slate-600 leading-relaxed">
                收录英、美、欧等主流留学国家的顶尖艺术与设计院校信息，数据持续更新。
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">多维智能筛选</h3>
              <p className="text-slate-600 leading-relaxed">
                支持按排名、学费、语言要求、作品集难度等多个维度精准筛选，快速定位目标学校。
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">客观横向对比</h3>
              <p className="text-slate-600 leading-relaxed">
                直观展示各校优劣势与专业特色，拒绝营销包装，用真实数据辅助您的留学决策。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Schools Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">热门顶尖艺术学府</h2>
              <p className="text-lg text-slate-600">探索全球最受关注的顶尖艺术与设计教育机构</p>
            </div>
            <Link to="/schools" className="hidden sm:flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              查看全部院校 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSchools.map((school) => (
              <SchoolCard 
                key={school.id} 
                school={school} 
                showImage={false}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/schools" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              查看全部院校 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开始你的艺术留学之旅了吗？</h2>
          <p className="text-xl text-indigo-100 mb-10">
            浏览我们庞大的艺术院校数据库，找到最适合你的那所学校。
          </p>
          <Link 
            to="/schools" 
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            <Palette className="w-6 h-6" />
            进入艺术院校库
          </Link>
        </div>
      </section>
    </div>
  );
}
