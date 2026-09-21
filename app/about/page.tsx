import { Target, Rocket, Diamond } from "lucide-react";
import T from "@/components/T";

const team = [
  { name: "أحمد خالد", roleKey: "about.roleFounder" },
  { name: "محمد علي", roleKey: "about.roleDeveloper" },
  { name: "سارة أحمد", roleKey: "about.roleDesigner" },
  { name: "نورا سامي", roleKey: "about.roleTeacherF" },
  { name: "خالد محمود", roleKey: "about.roleTeacher" },
  { name: "ليلى حسن", roleKey: "about.roleContentManager" },
  { name: "عمر إبراهيم", roleKey: "about.roleDeveloper" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6"><T k="about.title" /></h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            <T k="about.subtitle" />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="w-14 h-14 rounded-xl bg-sidrah-950/50 flex items-center justify-center mx-auto mb-4">
              <Target className="text-sidrah-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2"><T k="about.vision" /></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <T k="about.visionText" />
            </p>
          </div>
          <div className="card text-center">
            <div className="w-14 h-14 rounded-xl bg-sidrah-950/50 flex items-center justify-center mx-auto mb-4">
              <Rocket className="text-sidrah-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2"><T k="about.mission" /></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <T k="about.missionText" />
            </p>
          </div>
          <div className="card text-center">
            <div className="w-14 h-14 rounded-xl bg-sidrah-950/50 flex items-center justify-center mx-auto mb-4">
              <Diamond className="text-sidrah-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2"><T k="about.values" /></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <T k="about.valuesText" />
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2"><T k="about.team" /></h2>
          <p className="text-gray-400"><T k="about.teamSub" /></p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-400 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                {member.name[0]}
              </div>
              <h4 className="text-white text-sm font-medium">{member.name}</h4>
              <p className="text-gray-500 text-xs"><T k={member.roleKey} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
