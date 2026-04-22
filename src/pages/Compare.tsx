import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Check, X, MapPin, Globe, GraduationCap, Clock, BookOpen, Building, DollarSign, Star } from "lucide-react";

export default function Compare() {
  const [searchParams] = useSearchParams();
  const slugs = searchParams.get("slugs")?.split(",").slice(0, 3) || [];
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) {
      setLoading(false);
      return;
    }

    fetch(`/api/schools/compare?slugs=${slugs.join(",")}`)
      .then(res => res.json())
      .then(data => {
        // Sort data to match the order of slugs in URL
        const sortedData = slugs.map(slug => data.find((s: any) => s.slug === slug)).filter(Boolean);
        setSchools(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Helmet>
          <title>院校对比 | ArtEdu</title>
        </Helmet>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">暂无对比数据</h2>
        <p className="text-slate-500 mb-8">请先从艺术院校库中选择需要对比的学校。</p>
        <Link to="/schools" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回艺术院校库
        </Link>
      </div>
    );
  }

  const renderRow = (label: string, icon: any, field: string, isJson = false) => (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-4 px-4 align-top w-48 bg-white sticky left-0 z-10 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
          {icon} {label}
        </div>
      </td>
      {schools.map((school, idx) => (
        <td key={school.id} className={`py-4 px-6 align-top ${idx !== schools.length - 1 ? 'border-r border-slate-100' : ''}`}>
          {isJson ? (
            <div className="flex flex-wrap gap-2">
              {JSON.parse(school[field] || "[]").map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-800 text-sm leading-relaxed">{school[field] || "-"}</span>
          )}
        </td>
      ))}
      {/* Fill empty columns if less than 3 schools */}
      {Array.from({ length: 3 - schools.length }).map((_, idx) => (
        <td key={`empty-${idx}`} className="py-4 px-6 bg-slate-50/50"></td>
      ))}
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>院校对比 - {schools.map(s => s.name_zh).join(" vs ")} | ArtEdu</title>
        <meta name="description" content={`对比 ${schools.map(s => s.name_zh).join("、")} 的综合排名、学费、申请要求等详细信息。`} />
      </Helmet>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">院校对比</h1>
          <p className="text-slate-500">全方位横向比较，助你做出最佳选择</p>
        </div>
        <Link to="/schools" className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回选校库
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-6 px-4 w-48 bg-slate-50 sticky left-0 z-20 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                <span className="text-slate-400 text-sm font-medium">对比维度</span>
              </th>
              {schools.map((school, idx) => (
                <th key={school.id} className={`py-6 px-6 align-top w-[300px] ${idx !== schools.length - 1 ? 'border-r border-slate-200' : ''}`}>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                    <img src={school.image_url} alt={school.name_zh} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{school.name_zh}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">{school.name_en}</p>
                  <Link 
                    to={`/schools/${school.slug}`}
                    className="inline-block w-full text-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors"
                  >
                    查看详情
                  </Link>
                </th>
              ))}
              {Array.from({ length: 3 - schools.length }).map((_, idx) => (
                <th key={`empty-header-${idx}`} className="py-6 px-6 w-[300px] bg-slate-50/50 align-middle text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-4">
                    <span className="text-slate-400 text-2xl">+</span>
                  </div>
                  <p className="text-slate-500 text-sm">还可以添加 {3 - schools.length} 所学校</p>
                  <Link to="/schools" className="text-indigo-600 text-sm font-medium hover:underline mt-2 inline-block">去添加</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderRow("国家/地区", <Globe className="w-4 h-4" />, "country")}
            {renderRow("所在城市", <MapPin className="w-4 h-4" />, "city")}
            {renderRow("学校类型", <Building className="w-4 h-4" />, "type")}
            {renderRow("QS综合排名", <GraduationCap className="w-4 h-4" />, "qs_ranking")}
            {renderRow("专业排名", <Star className="w-4 h-4" />, "major_ranking")}
            {renderRow("学费范围", <DollarSign className="w-4 h-4" />, "tuition_range")}
            {renderRow("预算估算", <DollarSign className="w-4 h-4" />, "budget_estimation")}
            {renderRow("语言要求", <BookOpen className="w-4 h-4" />, "language_requirements")}
            {renderRow("GPA要求", <Check className="w-4 h-4" />, "gpa_requirements")}
            {renderRow("申请截止日期", <Clock className="w-4 h-4" />, "application_deadline")}
            {renderRow("申请时间建议", <Clock className="w-4 h-4" />, "application_advice")}
            {renderRow("优势专业", <Star className="w-4 h-4" />, "popular_majors", true)}
            {renderRow("申请难点", <Star className="w-4 h-4" />, "application_difficulties")}
            {renderRow("奖学金说明", <Star className="w-4 h-4" />, "scholarship_info")}
            {renderRow("校园特色", <Building className="w-4 h-4" />, "campus_features")}
          </tbody>
        </table>
      </div>
    </div>
  );
}
