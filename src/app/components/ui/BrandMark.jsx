function BrandMark({ className = "w-5 h-5" }) {
  return <span
    aria-hidden="true"
    className={`inline-block shrink-0 ${className}`}
    style={{
      backgroundColor: "currentColor",
      mask: "url('/brand/logo.svg') center / contain no-repeat",
      WebkitMask: "url('/brand/logo.svg') center / contain no-repeat"
    }}
  />;
}
export {
  BrandMark
};
