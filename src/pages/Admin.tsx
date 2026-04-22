import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function Admin() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);

  const fetchSchools = () => {
    setLoading(true);
    fetch("/api/schools?limit=100")
      .then(res => res.json())
      .then(data => {
        setSchools(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleEdit = (school: any) => {
    setEditingId(school.id);
    setFormData(school);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setFormData({
      slug: "",
      name_zh: "",
      name_en: "",
      country: "",
      city: "",
      type: "公立",
      qs_ranking: 100,
      tuition_range: "",
      language_requirements: "",
      popular_majors: "[]",
      application_deadline: "",
      website_url: "",
      introduction: "",
      image_url: "https://picsum.photos/seed/school/800/600",
      scholarship_info: "",
      degree_tags: "[]",
      difficulty_tag: "中等",
      employment_tag: "中"
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const url = isAdding ? "/api/schools" : `/api/schools/${editingId}`;
      const method = isAdding ? "POST" : "PUT";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        handleCancel();
        fetchSchools();
      } else {
        alert("保存失败");
      }
    } catch (error) {
      console.error(error);
      alert("保存时发生错误");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("确定要删除这所学校吗？")) {
      try {
        const res = await fetch(`/api/schools/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchSchools();
        } else {
          alert("删除失败");
        }
      } catch (error) {
        console.error(error);
        alert("删除时发生错误");
      }
    }
  };

  if (loading && schools.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">后台管理 - 院校数据</h1>
        {!isAdding && editingId === null && (
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" /> 添加院校
          </button>
        )}
      </div>

      {(isAdding || editingId !== null) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {isAdding ? "添加新院校" : "编辑院校信息"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL标识)</label>
              <input type="text" name="slug" value={formData.slug || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">中文名</label>
              <input type="text" name="name_zh" value={formData.name_zh || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">英文名</label>
              <input type="text" name="name_en" value={formData.name_en || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">国家</label>
                <input type="text" name="country" value={formData.country || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">城市</label>
                <input type="text" name="city" value={formData.city || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                <select name="type" value={formData.type || "公立"} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="公立">公立</option>
                  <option value="私立">私立</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">QS排名</label>
                <input type="number" name="qs_ranking" value={formData.qs_ranking || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">学费范围</label>
              <input type="text" name="tuition_range" value={formData.tuition_range || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">语言要求</label>
              <input type="text" name="language_requirements" value={formData.language_requirements || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">申请截止时间</label>
              <input type="text" name="application_deadline" value={formData.application_deadline || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">官网链接</label>
              <input type="text" name="website_url" value={formData.website_url || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">图片链接</label>
              <input type="text" name="image_url" value={formData.image_url || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">专业排名</label>
                <input type="text" name="major_ranking" value={formData.major_ranking || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GPA要求</label>
                <input type="text" name="gpa_requirements" value={formData.gpa_requirements || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">难度标签</label>
                <input type="text" name="difficulty_tag" value={formData.difficulty_tag || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">就业标签</label>
                <input type="text" name="employment_tag" value={formData.employment_tag || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">热门专业 (JSON数组)</label>
              <input type="text" name="popular_majors" value={formData.popular_majors || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">学位标签 (JSON数组)</label>
              <input type="text" name="degree_tags" value={formData.degree_tags || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">奖学金信息</label>
              <textarea name="scholarship_info" value={formData.scholarship_info || ""} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">预算估算</label>
              <input type="text" name="budget_estimation" value={formData.budget_estimation || ""} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">校园特色</label>
              <textarea name="campus_features" value={formData.campus_features || ""} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">申请难点</label>
              <textarea name="application_difficulties" value={formData.application_difficulties || ""} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">申请时间建议</label>
              <textarea name="application_advice" value={formData.application_advice || ""} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">学校简介</label>
              <textarea name="introduction" value={formData.introduction || ""} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" /> 保存
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">中文名</th>
                <th className="px-6 py-4">国家</th>
                <th className="px-6 py-4">QS排名</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{school.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{school.name_zh}</td>
                  <td className="px-6 py-4">{school.country}</td>
                  <td className="px-6 py-4">{school.qs_ranking}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(school)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(school.id)}
                      className="text-rose-600 hover:text-rose-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
