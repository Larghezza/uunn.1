import { Mail, Phone, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Helmet>
        <title>联系我们 - GlobalEdu</title>
        <meta name="description" content="如果您有任何问题、建议或合作意向，请随时与我们联系。" />
      </Helmet>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">联系我们</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          如果您有任何问题、建议或合作意向，请随时与我们联系。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">联系方式</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">电子邮件</h3>
                <p className="text-slate-600">contact@globaledu.example.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">电话</h3>
                <p className="text-slate-600">+86 400-123-4567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">地址</h3>
                <p className="text-slate-600">北京市海淀区中关村大街 1 号</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">发送消息</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">姓名</label>
              <input type="text" id="name" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="您的姓名" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">电子邮件</label>
              <input type="email" id="email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="您的电子邮件" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">消息内容</label>
              <textarea id="message" rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="您想对我们说些什么？"></textarea>
            </div>
            <button type="button" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
