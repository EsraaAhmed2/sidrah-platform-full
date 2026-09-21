interface CourseCoverProps {
  color: string;
  title: string;
  emoji?: string;
  className?: string;
}

const patternSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="30" cy="30" r="1.5" fill="white" fill-opacity="0.18"/></svg>`
);

export default function CourseCover({ color, title, emoji, className = "" }: CourseCoverProps) {
  return (
    <div
      className={`relative w-full h-40 rounded-xl bg-gradient-to-br ${color} overflow-hidden flex items-center justify-center ${className}`}
      role="img"
      aria-label={title}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url("data:image/svg+xml,${patternSvg}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <span className="relative text-5xl drop-shadow-lg" aria-hidden="true">
        {emoji}
      </span>
      <span className="absolute bottom-3 right-4 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
        {title.split(" - ")[0]}
      </span>
    </div>
  );
}
