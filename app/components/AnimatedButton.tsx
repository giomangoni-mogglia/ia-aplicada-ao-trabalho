"use client";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function AnimatedButton({
  href,
  children,
  size = "md",
  className = "",
}: AnimatedButtonProps) {
  const paddingMap = {
    sm: "py-3 px-6 min-w-[180px] text-sm",
    md: "py-4 px-8 min-w-[240px] text-base",
    lg: "py-5 px-10 min-w-[280px] text-lg",
  };

  return (
    <a href={href} className={`uiverse-btn ${className}`}>
      <span className={`btn-wrapper flex items-center justify-center gap-2 ${paddingMap[size]}`}>
        <span className="btn-text">{children}</span>
        <span className="circle circle-1" />
        <span className="circle circle-2" />
        <span className="circle circle-3" />
        <span className="circle circle-4" />
        <span className="circle circle-5" />
        <span className="circle circle-6" />
        <span className="circle circle-7" />
        <span className="circle circle-8" />
        <span className="circle circle-9" />
        <span className="circle circle-10" />
        <span className="circle circle-11" />
        <span className="circle circle-12" />
      </span>
    </a>
  );
}
