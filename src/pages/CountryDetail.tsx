import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function CountryDetail() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (countrySlug) {
      fetch(`/api/schools?country=${encodeURIComponent(countrySlug)}&limit=100`)
        .then(res => res.json())
        .then(data => {
          setSchools(data.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [countrySlug]);

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
        <title>{countrySlug} 留学院校推荐 - GlobalEdu</title>
        <meta name="description" content={`探索 ${countrySlug} 的顶尖院校，了解详细的申请要求和学校信息。`} />
      </Helmet>
      <div className="mb-8">
        <Link to="/countries" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> 返回国家列表
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{countrySlug} 留学</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          探索 {countrySlug} 的顶尖院校，了解详细的申请要求和学校信息。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school) => (
          <Link to={`/schools/${school.slug}`} key={school.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={school.image_url} 
                alt={school.name_zh} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                QS #{school.qs_ranking}
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{school.country}, {school.city}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{school.name_zh}</h3>
              <p className="text-sm text-slate-500 mb-4 font-medium">{school.name_en}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                  {school.type}
                </span>
                <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-xs font-medium">
                  {school.difficulty_tag}
                </span>
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-medium">
                  就业{school.employment_tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {schools.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-lg text-slate-500">暂无该国家的院校数据。</p>
        </div>
      )}
    </div>
  );
}
