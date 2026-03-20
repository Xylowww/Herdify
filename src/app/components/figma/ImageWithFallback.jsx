import { useState } from "react";
function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const handleError = () => {
    setDidError(true);
  };
  const { src, alt, style, className, ...rest } = props;
  return didError ? <div
    className={`relative inline-block overflow-hidden text-center align-middle bg-[linear-gradient(135deg,#f6f3eb_0%,#eef6f0_100%)] ${className ?? ""}`}
    style={style}
  >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(111,175,95,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(198,138,58,0.16),transparent_28%)]" />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 shadow-soft">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F6B3F" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="m7 13 3-3 3 3 4-4 2 2" />
            <path d="M8 8h.01" />
          </svg>
        </div>
        <p className="max-w-[12rem] text-xs text-[#2F6B3F]" style={{ fontWeight: 700 }}>
          {alt || "Image unavailable"}
        </p>
      </div>
    </div> : <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />;
}
export {
  ImageWithFallback
};
