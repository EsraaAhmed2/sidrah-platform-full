"use client";
import Link from "next/link";
import { Award, Download, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCourses } from "@/lib/courses-data";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

const earned = [1, 4, 3]; // course ids with completed certificates

export default function CertificatesPage() {
  const { t } = useLang();
  const all = getAllCourses();
  const myCerts = all.filter((c) => earned.includes(c.id));

  const share = (title: string) => {
    navigator.clipboard.writeText(`${t("certs.sharePre")} "${title}" ${t("certs.sharePost")}`);
    toast.success(t("certs.copied"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("certs.title") }]} />
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="text-yellow-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("certs.title")}</h1>
          <p className="text-[var(--text-secondary)]">{myCerts.length} {t("certs.subtitle")}</p>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {myCerts.map((c) => (
            <StaggerItem key={c.id} className="card !p-0 overflow-hidden group">
              <div className={`bg-gradient-to-br ${c.color} p-6 text-white relative`}>
                <Award size={40} className="absolute top-4 left-4 opacity-30" />
                <p className="text-white/80 text-xs mb-1">{t("certs.completion")}</p>
                <h2 className="text-xl font-bold">{c.certificateTitle}</h2>
                <p className="text-white/80 text-sm mt-2">{t("certs.platform")}</p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-4">
                  <span>{t("certs.verify")} SDR-{c.id}00{Math.floor(Math.random() * 900 + 100)}</span>
                  <span>{c.instructor}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/courses/${c.id}/certificate`} className="btn-primary flex-1 !py-2 text-sm flex items-center justify-center gap-2">
                    <ExternalLink size={15} /> {t("certs.view")}
                  </Link>
                  <button
                    onClick={() => { window.open(`/courses/${c.id}/certificate`, "_blank"); }}
                    className="btn-secondary !py-2 !px-4 flex items-center gap-2 text-sm"
                    aria-label={t("certs.view")}
                  >
                    <Download size={15} />
                  </button>
                  <button
                    onClick={() => share(c.certificateTitle)}
                    className="btn-secondary !py-2 !px-4 flex items-center gap-2 text-sm"
                    aria-label={t("certs.shareAria")}
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="card mt-8 text-center bg-gradient-to-br from-sidrah-950/40 to-purple-950/20 border-sidrah-800/40">
          <p className="text-[var(--text-secondary)] mb-4">{t("certs.cta")}</p>
          <Link href="/courses" className="btn-primary">{t("certs.browse")}</Link>
        </div>
      </div>
    </div>
  );
}
