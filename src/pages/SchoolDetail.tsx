import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Globe, GraduationCap, DollarSign, Calendar, BookOpen, Award, Briefcase, ArrowLeft, ExternalLink, AlertCircle, Clock, CheckCircle, Calculator, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function SchoolDetail() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (schoolSlug) {
      fetch(`/api/schools/${schoolSlug}`)
        .then(res => {
          if (!res.ok) throw new Error("School not found");
          return res.json();
        })
        .then(data => {
          setSchool(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [schoolSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">未找到该院校</h1>
        <p className="text-slate-600 mb-8">您查找的院校可能不存在或已被移除。</p>
        <Link to="/schools" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回院校库
        </Link>
      </div>
    );
  }

  const popularMajors = JSON.parse(school.popular_majors || "[]");
  const degreeTags = JSON.parse(school.degree_tags || "[]");
  const majorDetails = school.major_details ? JSON.parse(school.major_details) : [];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Helmet>
        <title>{school.name_zh} ({school.name_en}) - GlobalEdu</title>
        <meta name="description" content={school.introduction?.substring(0, 150) + "..."} />
      </Helmet>
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-slate-900">
        <img 
          src={school.image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"} 
          alt={school.name_zh} 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link to="/schools" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> 返回院校库
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    QS #{school.qs_ranking}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                    {school.type}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                  {school.name_zh}
                </h1>
                <p className="text-xl text-slate-300 font-medium mb-4">
                  {school.name_en}
                </p>
                <div className="flex items-center gap-4 text-slate-300 text-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{school.country}, {school.city}</span>
                  </div>
                  <a 
                    href={school.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>官方网站</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" /> 院校简介
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {school.introduction || "暂无简介"}
              </div>
            </section>

            {/* Popular Majors */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600" /> 热门专业
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {popularMajors.length > 0 ? popularMajors.map((major: string, index: number) => (
                  <span key={index} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium border border-slate-200">
                    {major}
                  </span>
                )) : <span className="text-slate-500">暂无数据</span>}
              </div>

              {majorDetails.length > 0 && (
                <div className="space-y-6 mt-8 border-t border-slate-100 pt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">专业详细要求</h3>
                  {majorDetails.map((major: any, idx: number) => (
                    <details key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                        <div>
                          <h4 className="text-lg font-bold text-indigo-700">{major.major_name}</h4>
                          {major.degree && (
                            <span className="inline-block mt-1 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium">
                              {major.degree}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      
                      <div className="p-6 border-t border-slate-200 bg-slate-50">
                        {major.round_1 && (
                          <div className="mb-6">
                            <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                              {major.round_1.title || "一面要求 (Round 1)"}
                            </h5>
                            {Array.isArray(major.round_1.requirements) ? (
                              <ol className="list-decimal list-inside text-slate-600 text-sm leading-relaxed mb-3 space-y-1.5 ml-1">
                                {major.round_1.requirements.map((req: string, i: number) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ol>
                            ) : (
                              <p className="text-slate-600 text-sm leading-relaxed mb-3">{major.round_1.requirements}</p>
                            )}
                            {major.round_1.source_url && (
                              <a href={major.round_1.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded">
                                <ExternalLink className="w-3 h-3" /> 官网溯源
                              </a>
                            )}
                          </div>
                        )}

                        {major.round_2 && (
                          <div className="mt-6 pt-6 border-t border-slate-200">
                            <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                              {major.round_2.title || "二面要求 (Round 2)"}
                            </h5>
                            {Array.isArray(major.round_2.requirements) ? (
                              <ol className="list-decimal list-inside text-slate-600 text-sm leading-relaxed mb-3 space-y-1.5 ml-1">
                                {major.round_2.requirements.map((req: string, i: number) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ol>
                            ) : (
                              <p className="text-slate-600 text-sm leading-relaxed mb-3">{major.round_2.requirements}</p>
                            )}
                            {major.round_2.source_url && (
                              <a href={major.round_2.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded">
                                <ExternalLink className="w-3 h-3" /> 官网溯源
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>

            {/* Application Difficulties */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-rose-500" /> 申请难点
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {school.application_difficulties || "暂无申请难点分析"}
              </div>
            </section>

            {/* Application Timeline Advice */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-500" /> 申请时间建议
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {school.application_advice || "暂无申请时间建议"}
              </div>
            </section>

            {/* Scholarship Info */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600" /> 奖学金说明
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {school.scholarship_info || "暂无奖学金信息"}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">核心信息</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">专业排名</p>
                    <p className="text-slate-900 font-semibold">{school.major_ranking || "暂无数据"}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">学费范围 (每年)</p>
                    <p className="text-slate-900 font-semibold">{school.tuition_range || "暂无数据"}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">预算估算 (每年)</p>
                    <p className="text-slate-900 font-semibold">{school.budget_estimation || "暂无数据"}</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">语言要求</p>
                    <p className="text-slate-900 font-semibold">{school.language_requirements || "暂无数据"}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">GPA要求</p>
                    <p className="text-slate-900 font-semibold">{school.gpa_requirements || "暂无数据"}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">申请截止时间</p>
                    <p className="text-slate-900 font-semibold">{school.application_deadline || "暂无数据"}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">院校标签</h3>
                <div className="flex flex-wrap gap-2">
                  {degreeTags.map((tag: string, index: number) => (
                    <span key={index} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                  <span className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                    难度: {school.difficulty_tag || "未知"}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> 就业: {school.employment_tag || "未知"}
                  </span>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
