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
    <div className="fh-page-canvas fh-user-shell min-h-0 text-[var(--text-primary)]">
      <div
        className={`w-full px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 xl:px-8 ${
          stickyFooter ? "pb-24 sm:pb-20 lg:pb-4" : ""
        }`}
      >
        {header ? <div className="fh-enter mb-4">{header}</div> : null}
        {hero ? <div className="fh-enter fh-enter-delay-1 mb-5">{hero}</div> : null}

        <div
          className={`grid items-start gap-5 sm:gap-6 ${
            aside ? "xl:grid-cols-[minmax(0,1fr)_minmax(304px,0.42fr)] 2xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.4fr)]" : ""
          }`}
        >
          <div className="fh-stagger space-y-5">{main}</div>
          {aside ? <div className="fh-enter fh-enter-delay-2 space-y-5">{aside}</div> : null}
        </div>
      </div>

      {stickyFooter}
    </div>
  );
}


