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
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div
        className={`mx-auto w-full max-w-[1680px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8 ${
          stickyFooter ? "pb-24 sm:pb-20 lg:pb-4" : ""
        }`}
      >
        {header ? <div className="fh-enter">{header}</div> : null}
        {hero ? <div className="fh-enter fh-enter-delay-1">{hero}</div> : null}

        <div className={`grid items-start gap-4 sm:gap-5 ${aside ? "xl:grid-cols-[1.2fr_0.8fr]" : ""}`}>
          <div className="fh-stagger space-y-4">{main}</div>
          {aside ? <div className="fh-enter fh-enter-delay-2 space-y-4">{aside}</div> : null}
        </div>
      </div>

      {stickyFooter}
    </div>
  );
}

