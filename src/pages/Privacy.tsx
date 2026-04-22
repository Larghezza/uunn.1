import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Helmet>
        <title>隐私政策 - ArtEdu</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">隐私政策</h1>
      <div className="prose prose-lg prose-slate mx-auto">
        <p>生效日期：2026年3月12日</p>
        <p>ArtEdu（以下简称“我们”）非常重视您的隐私。本隐私政策旨在说明我们如何收集、使用、披露和保护您的个人信息。</p>
        
        <h2>1. 信息收集</h2>
        <p>我们可能会收集以下类型的信息：</p>
        <ul>
          <li><strong>您提供的信息：</strong> 当您注册账户、订阅新闻通讯或联系我们时，您可能会提供姓名、电子邮件地址等信息。</li>
          <li><strong>自动收集的信息：</strong> 当您访问我们的网站时，我们可能会自动收集您的 IP 地址、浏览器类型、操作系统、访问时间等信息。</li>
        </ul>

        <h2>2. 信息使用</h2>
        <p>我们收集的信息可能用于以下目的：</p>
        <ul>
          <li>提供、维护和改进我们的服务。</li>
          <li>处理您的请求和查询。</li>
          <li>发送与服务相关的通知和更新。</li>
          <li>分析网站使用情况，以优化用户体验。</li>
        </ul>

        <h2>3. 信息共享</h2>
        <p>我们不会将您的个人信息出售给第三方。我们仅在以下情况下共享您的信息：</p>
        <ul>
          <li>获得您的明确同意。</li>
          <li>为了遵守法律法规或响应法律程序。</li>
          <li>与代表我们提供服务的可信第三方合作伙伴共享（受保密协议约束）。</li>
        </ul>
      </div>
    </div>
  );
}
