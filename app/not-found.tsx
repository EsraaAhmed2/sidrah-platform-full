import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";
import T from "@/components/T";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-8xl font-bold bg-gradient-to-r from-sidrah-400 to-purple-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Compass className="text-sidrah-400" size={30} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3"><T k="notfound.title" /></h1>
        <p className="text-[var(--text-secondary)] mb-8">
          <T k="notfound.text" />
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home size={18} /> <T k="notfound.home" />
          </Link>
          <Link href="/search" className="btn-secondary inline-flex items-center gap-2">
            <Search size={18} /> <T k="notfound.search" />
          </Link>
        </div>
      </div>
    </div>
  );
}
