export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  color: string;
  emoji: string;
}

export const posts: Post[] = [
  {
    id: 1,
    slug: "react-hooks-guide",
    title: "دليلك الشامل لـ React Hooks",
    excerpt: "اتعلم أهم الـ Hooks في React — useState, useEffect, useContext — مع أمثلة عملية تطبقها فوراً.",
    content: [
      "React Hooks غيّرت طريقة كتابتنا للكود بشكل جذري. قبل Hooks كنا محتاجين class components عشان نستخدم الـ state و lifecycle methods، لكن دلوقتي كل ده بقى متاح في functional components.",
      "## useState — إدارة الحالة\n\nأبسط وأشهر Hook. بيخليك تحتفظ بقيمة وتغيرها:\n\n```\nconst [count, setCount] = useState(0);\n```\n\nكل ما setCount تتنفذ، الـ component بيعمل re-render بالقيمة الجديدة.",
      "## useEffect — التأثيرات الجانبية\n\nبيستخدم للـ side effects زي جلب بيانات من API:\n\n```\nuseEffect(() => {\n  fetchData();\n}, []);\n```\n\nالـ dependency array بتحدد إمتى الـ effect يشتغل.",
      "## نصائح مهمة\n\n- متكسرش قواعد الـ Hooks: ندهمش جوه loops أو conditions\n- استخدم custom hooks لإعادة استخدام المنطق\n- اقرأ الـ documentation الرسمي — من أفضل المصادر",
    ],
    author: "أحمد صلاح",
    date: "2026-08-15",
    readTime: "7 دقائق",
    category: "Front-End",
    color: "from-blue-500 to-cyan-400",
    emoji: "⚛️",
  },
  {
    id: 2,
    slug: "python-for-beginners",
    title: "ليه Python أفضل لغة للمبتدئين؟",
    excerpt: "Python لغة سهلة القراءة وقوية — اتعرف ليه ملايين المبرمجين بيبدأوا بيها وإزاي تبدأ انت.",
    content: [
      "لو لسه بتبدأ رحلتك في البرمجة، Python هي أفضل اختيار ممكن تبدأ بيه — والأسباب واضحة.",
      "## سهولة القراءة\n\nPython مصممة إنها تكون شبه اللغة الإنجليزية:\n\n```\nif age >= 18:\n    print(\"مبروك!\")\n```\n\nمفيش أقواس معقدة ولا semicolons — الكود بيقرأ نفسه.",
      "## استخدامات واسعة\n\n- تطوير الويب (Django, Flask)\n- الذكاء الاصطناعي وتحليل البيانات\n- الأتمتة والسكريبتات\n- أمن المعلومات",
      "## مجتمع ضخم\n\nأي مشكلة هتواجهها، حد حلها قبلك — Stack Overflow و GitHub مليانين إجابات. ابدأ دلوقتي ومتستناش!",
    ],
    author: "محمد علي",
    date: "2026-08-20",
    readTime: "5 دقائق",
    category: "Back-End",
    color: "from-yellow-500 to-green-400",
    emoji: "🐍",
  },
  {
    id: 3,
    slug: "how-to-be-fullstack",
    title: "إزاي تبقى Full Stack Developer في 2026؟",
    excerpt: "خارطة طريق عملية: من HTML و CSS لحد الـ deployment — كل اللي محتاجه في مكان واحد.",
    content: [
      "الـ Full Stack Developer هو اللي بيعرف يشتغل على الواجهة الأمامية والخلفية مع بعض — وده بيخليه مطلوب جداً في سوق العمل.",
      "## المرحلة 1: الأساسيات\n\nابدأ بـ HTML, CSS, JavaScript. متستعجلش — الأساسيات هي اللي بتفرق بين مبرمج عادي ومبرمج محترف.",
      "## المرحلة 2: Front-End\n\nاتعلم React أو Vue. ركز على: Components, State Management, Routing, وربط الـ APIs.",
      "## المرحلة 3: Back-End\n\nاختار Node.js (Express) أو Python (Django). اتعلم: REST APIs, Authentication, قواعد البيانات (SQL و MongoDB).",
      "## المرحلة 4: النشر\n\nاتعلم Git, Docker أساسيات, وازاي تنشر على Vercel أو Railway. المشاريع اللي بتنشرها هي اللي بتثبت مهارتك.",
      "أهم نصيحة: **ابني مشاريع، مش بس اتفرج على كورسات.** الكود اللي بتكتبه بإيدك هو اللي بيعلمك فعلاً.",
    ],
    author: "سارة أحمد",
    date: "2026-08-28",
    readTime: "10 دقائق",
    category: "Full Stack",
    color: "from-purple-500 to-pink-400",
    emoji: "🚀",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
