import { Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Helmet>
        <title>关于我们 - GlobalEdu</title>
        <meta name="description" content="了解 GlobalEdu 的使命和愿景，我们致力于打破信息差，让留学选校更透明、更高效。" />
      </Helmet>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-6">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">关于 GlobalEdu</h1>
        <p className="text-xl text-slate-600">打破信息差，让留学选校更透明、更高效。</p>
      </div>

      <div className="prose prose-lg prose-slate mx-auto">
        <p>
          GlobalEdu 致力于为有出国留学计划的学生、家长以及教育从业者提供全面、客观、专业的海外院校信息整合服务。
        </p>
        <h2>我们的使命</h2>
        <p>
          在信息爆炸的时代，寻找真实、准确的留学信息变得越来越困难。我们的使命是打破留学行业的信息壁垒，通过结构化的数据和直观的对比工具，帮助每一位学子找到最适合自己的留学目的地。
        </p>
        <h2>我们提供什么？</h2>
        <ul>
          <li><strong>全面的院校数据库：</strong> 覆盖英、美、澳、加、新等主流留学国家的顶尖院校。</li>
          <li><strong>多维度的筛选工具：</strong> 支持按排名、学费、语言要求、录取难度等条件精准筛选。</li>
          <li><strong>客观的数据对比：</strong> 拒绝营销包装，用真实数据辅助您的留学决策。</li>
        </ul>
        <h2>联系我们</h2>
        <p>
          如果您有任何建议或合作意向，请随时通过 <a href="mailto:contact@globaledu.example.com">contact@globaledu.example.com</a> 与我们联系。
        </p>
      </div>
    </div>
  );
}
