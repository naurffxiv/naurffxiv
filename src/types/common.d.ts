import type { ReactElement, ReactNode } from "react";

// Requires children to be present, unlike React's PropsWithChildren
export type WithChildren = {
  children: ReactNode;
};

// Functional component type with required children
export type FCWithChildren<P = unknown> = (
  props: P & WithChildren,
) => ReactElement;

// Alias for WithChildren – useful for destructured props
export type ChildrenProps = WithChildren;
