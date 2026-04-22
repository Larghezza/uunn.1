import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Helmet>
        <title>服务条款 - ArtEdu</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">服务条款</h1>
      <div className="prose prose-lg prose-slate mx-auto">
        <p>生效日期：2026年3月12日</p>
        <p>欢迎访问 ArtEdu（以下简称“本网站”）。请在使用本网站之前仔细阅读以下服务条款（以下简称“本条款”）。</p>
        
        <h2>1. 接受条款</h2>
        <p>通过访问或使用本网站，您同意受本条款的约束。如果您不同意本条款的任何部分，请勿使用本网站。</p>

        <h2>2. 服务说明</h2>
        <p>ArtEdu 提供海外院校信息的整合、查询和对比服务。我们尽最大努力确保信息的准确性和时效性，但不对信息的绝对准确性、完整性或适用性做出任何明示或暗示的保证。</p>

        <h2>3. 用户责任</h2>
        <p>在使用本网站时，您同意：</p>
        <ul>
          <li>提供真实、准确、完整的个人信息（如适用）。</li>
          <li>不利用本网站进行任何非法或未经授权的活动。</li>
          <li>不干扰或破坏本网站的正常运行。</li>
          <li>不侵犯他人的知识产权或其他合法权益。</li>
        </ul>

        <h2>4. 知识产权</h2>
        <p>本网站上的所有内容（包括但不限于文本、图像、标识、软件等）均受版权、商标权和其他知识产权法律的保护。未经我们事先书面许可，您不得复制、修改、分发或以其他方式使用这些内容。</p>

        <h2>5. 免责声明</h2>
        <p>本网站提供的信息仅供参考，不构成任何形式的专业建议。我们不对因使用本网站信息而导致的任何直接、间接、偶然或后果性损失承担责任。</p>
      </div>
    </div>
  );
}
