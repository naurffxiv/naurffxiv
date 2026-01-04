"use client";

import type { ReactElement } from "react";
import type { ReactNode } from "react";

type SimplePageProps = {
  title: string;
  children?: ReactNode;
};

export default function SimplePage({
  title,
  children,
}: SimplePageProps): ReactElement {
  return (
    <div className="flex flex-col">
      <main className="flex-grow p-6">
        <h1 className="mb-6 text-3xl font-extrabold">{title}</h1>
        <div>
          {children ? (
            children
          ) : (
            <p className="text-muted">This is the {title} page content.</p>
          )}
        </div>
      </main>
    </div>
  );
}
