import React from "react";

type UserPageShellProps = {
  header?: React.ReactNode;
  hero?: React.ReactNode;
  main: React.ReactNode;
  aside?: React.ReactNode;
  stickyFooter?: React.ReactNode;
};

export default function UserPageShell({
  header,
  hero,
  main,
  aside,
  stickyFooter,
}: UserPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8">
        {header}
        {hero}

        <div className={`grid items-start gap-5 ${aside ? "xl:grid-cols-[1.2fr_0.8fr]" : ""}`}>
          <div className="space-y-4">{main}</div>
          {aside ? <div className="space-y-4">{aside}</div> : null}
        </div>
      </div>

      {stickyFooter}
    </div>
  );
}

