import React from "react";

function MagicBtn({
  title,
  position,
  icon,
  otherClasses,
  handleClick,
}: {
  title: string;
  position?: string;
  icon?: React.ReactNode;
  otherClasses?: string;
  handleClick?: () => void;
}) {
  return (
    <div>
      <button className={`animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${otherClasses} `}>
        {position == "left" && icon}
        {title}
        {position == "right" && icon}
      </button>
    </div>
  );
}

export default MagicBtn;
