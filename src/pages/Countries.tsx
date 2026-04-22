import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Countries() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/countries")
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>热门留学国家/地区 - GlobalEdu</title>
        <meta name="description" content="探索全球最受欢迎的留学目的地，了解不同国家的教育体系和院校分布。" />
      </Helmet>
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">热门留学国家/地区</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          探索全球最受欢迎的留学目的地，了解不同国家的教育体系和院校分布。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {countries.map((c) => (
          <Link 
            key={c.country} 
            to={`/countries/${encodeURIComponent(c.country)}`}
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.country}</h2>
            <p className="text-slate-500 font-medium mb-4">{c.count} 所院校</p>
            <div className="mt-auto text-indigo-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              查看院校 <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
